import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'luciano',
    url: 'www.testing.com',
    likes: 4,
  };

  const { container } = render(
    <Blog blog={blog} updateView={() => console.log('update')} />
  );

  const div = container.querySelector('.blog');
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
});

test('clicking the button calls event handler once', async () => {
  const blog = {
    content: 'Component testing is done with react-testing-library',
    author: 'luciano',
    url: 'www.testing.com',
    likes: 4,
  };

  const mockHandler = vi.fn();

  const { container } = render(<Blog blog={blog} updateView={mockHandler} />);

  const user = userEvent.setup();
  const button = container.querySelector('.view');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
