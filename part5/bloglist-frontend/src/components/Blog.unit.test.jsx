import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'luciano',
    url: 'www.testing.com',
    likes: 4,
  };

  const mockHandler = vi.fn();
  const { container } = render(<Blog blog={blog} updateView={mockHandler} />);
  const div = container.querySelector('.blog');

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
});

test('blog component should show only a title and an blog author ', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'luciano',
    url: 'www.testing.com',
    likes: 4,
  };

  const mockHandler = vi.fn();
  const { container } = render(<Blog blog={blog} updateView={mockHandler} />);

  const h3 = container.querySelector('.blog-title');
  const h4 = container.querySelector('.blog-author');
  const details = container.querySelector('.togglableContent');

  expect(h3).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
  expect(h4).toHaveTextContent('luciano');
  expect(details).toHaveStyle('display: none');
});
