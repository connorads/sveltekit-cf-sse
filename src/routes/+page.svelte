<script lang="ts">
	import { onMount } from 'svelte';

	let messages: string[] = $state([]);

	onMount(async () => {
		const res = await fetch('/sse');
		const reader = res.body?.pipeThrough(new TextDecoderStream()).getReader();
		if (!reader) return;
		while (true) {
			const { value, done } = await reader.read();
			if (done) break;
			console.log('Message recieved:', value);
			messages.push(value);
		}
	});
</script>

<h1>SvelteKit and Server Sent Events (SSE)</h1>
<p>
	Trying to do a MVP for SSE with SvelteKit and Cloudflare as per <a
		href="https://community.cloudflare.com/t/server-sent-events-readablestream-not-working/645073/2"
		>this Cloudflare community post</a
	>.
</p>
<ul>
	{#each messages as message}
		<li>{message}</li>
	{/each}
</ul>
