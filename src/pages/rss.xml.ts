import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  
  return rss({
    title: "Priyam's Blog",
    description: "Thoughts on tech, systems, and ideas.",
    site: context.site ?? 'https://ProPriyam.github.io',
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map(post => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description ?? '',
        link: `/blog/${post.slug}/`,
      })),
    customData: `<language>en-us</language>`,
  });
}
