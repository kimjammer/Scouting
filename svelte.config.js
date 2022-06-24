import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess'
import makeAttractionsImporter from 'attractions/importer.js';
import path from 'path';
import { fileURLToPath } from 'url';

//Emulating filename and dirname variables found in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const config = {
	preprocess: preprocess(
	{
		//This part allows the UI library, Attractions, to use our custom theming
		// ...svelte-preprocess options
		scss: {
			importer: makeAttractionsImporter({
				themeFile: path.join(__dirname, 'src/css/theme.scss'),
			}),
			includePaths: [path.join(__dirname, './src/css')],
		},
	}),
	kit: {
		adapter: adapter({}),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	}
};

export default config;
