import { render, screen } from '@testing-library/react';
import App from './App';
import Hello from './components/Test';
import CoinIndex from './components/CoinIndex';
import CoinShow from './components/CoinShow';
import CoinFavourite from './components/CoinFavourite';
import CoinTrade from './components/CoinTrade';
import Spinner from "./components/Spinner";

const user = {
    // name: "mike",
    name: "tom",
    age: 30,
};

const user2 = {
    age:20,
}

test('Check to include hello', () => {
    render(<Hello user={user}/>);
    const Element = screen.getByText(/Hello/i);
    expect(Element).toBeInTheDocument();
})

test('snapshot : name vaild', () => {
    const Element = render(<Hello user={user}/>);
    expect(Element).toMatchSnapshot();
});

test('snapshot : name invaild', () => {
    const Element = render(<Hello user={user2}/>);
    expect(Element).toMatchSnapshot();
});

test('snapshot : react app', () => {
    const linkElement = render(<App/>);
    expect(linkElement).toMatchSnapshot();
});
  
test('snapshot : CoinIndex', () => {
  const linkElement = render(<CoinIndex/>);
  expect(linkElement).toMatchSnapshot();
});
  
test('snapshot : CoinShow', () => {
  const linkElement = render(<CoinShow/>);
  expect(linkElement).toMatchSnapshot();
});

test('snapshot : CoinFavourite', () => {
    const linkElement = render(<CoinFavourite/>);
    expect(linkElement).toMatchSnapshot();
});

test('snapshot : CoinTrade', () => {
    const linkElement = render(<CoinTrade/>);
    expect(linkElement).toMatchSnapshot();
});

test('snapshot : Spinner', () => {
    const linkElement = render(<Spinner/>);
    expect(linkElement).toMatchSnapshot();
});