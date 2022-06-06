import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess'
import makeAttractionsImporter from 'attractions/importer.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const config = {
	preprocess: preprocess(
	{
		// ...svelte-preprocess options
		scss: {
			importer: makeAttractionsImporter({
				themeFile: path.join(__dirname, 'src/css/theme.scss'),
			}),
			includePaths: [path.join(__dirname, './src/css')],
		},
	}),
	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	}
};

export default config;
