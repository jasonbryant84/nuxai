'use client';

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';

interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({
  children,
}: StoreProviderProps): ReactNode {
  return <Provider store={store}>{children}</Provider>;
}
