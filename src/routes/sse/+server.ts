export const GET = async () => {
	const { readable, writable } = new TransformStream();
	const writer = writable.getWriter();

	async function myBackendCode() {
		while (true) {
			// TODO handle rejected promises? Try refreshing the page a few times
			await writer.write(new TextEncoder().encode("Hello there, let's stream some data lad"));
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await writer.write(new TextEncoder().encode('Moar data'));
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await writer.write(new TextEncoder().encode('Even moar data'));
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await writer.write(new TextEncoder().encode('wahwahweewah'));
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	}

	myBackendCode(); // do not await here

	return new Response(readable, {
		headers: {
			'Content-Type': 'text/event-stream',
			Connection: 'keep-alive',
			'Cache-Control': 'no-cache'
		}
	});
};
