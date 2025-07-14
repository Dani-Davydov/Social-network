import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect } from '@jest/globals';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Auth } from '../../../pages/Auth/Auth.jsx';
import { store } from '../../../Redux/store';

test('Button', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Auth />
            </MemoryRouter>
        </Provider>
    );

    const btn = screen.getByText(/Enter/i);
    expect(btn).toBeInTheDocument();
});