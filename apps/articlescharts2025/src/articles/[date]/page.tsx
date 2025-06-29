import { notFound } from 'next/navigation';
import articles from '../../../data/articles.json';
import ChartBlock from '../../../components/ChartBlock';
import { Article } from '../../../types';
import { ChartBlock as ChartBlockType } from '../../../types';

interface Props {
  params: {
    date: string;
  };
}

async function getChartData(date: string): Promise<ChartBlockType[]> {
  try {
    const chartData = await import(`../../../utils/chartData/${date}`);
    return chartData.default;
  } catch (error) {
    console.error(`Failed to load chart data for ${date}:`, error);
    return [];
  }
}

export default async function ArticlePage({ params }: Props) {
  const date = await Promise.resolve(params.date);
  const article = articles.find((a: Article) => a.date === date);

  if (!article) {
    notFound();
  }

  const chartData = await getChartData(date);

  if (chartData.length === 0) {
    return (
      <main className="max-w-3xl mx-auto p-4">
        <article className="rounded-lg border border-gray-200 p-8 bg-white shadow-sm">
          <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
          <p className="text-gray-700 text-base mb-4 leading-relaxed">{article.summary}</p>
          <div className="mb-4">
            {article.tags.map(tag => (
              <span
                key={tag}
                className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-red-500">Chart data not available for this article.</p>
        </article>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-4">
      <article className="rounded-lg border border-gray-200 p-8 bg-white shadow-sm">
        <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
        <p className="text-gray-700 text-base mb-4 leading-relaxed">{article.summary}</p>
        <div className="mb-4">
          {article.tags.map(tag => (
            <span
              key={tag}
              className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="space-y-8">
          {chartData.map((chart, index) => (
            <ChartBlock key={index} chart={chart} />
          ))}
        </div>
      </article>
    </main>
  );
} 