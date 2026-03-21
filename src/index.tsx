import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	return (
		<>
			<ArticleParamsForm />
			<Article />
		</>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);