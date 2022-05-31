import { render, screen } from '@testing-library/react';
import MainApp from './App';

describe("App component", () => {
  test('renders learn react link',async () => {
    render(<MainApp />);
    const linkElement = screen.queryByText(/Profile/i);
    expect(linkElement).toBeNull();
  });  
})

