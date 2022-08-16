import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoreInterfaces } from '@carro/utils';

interface EchoState {
  status: CoreInterfaces.ConnectionStatus | null;
}

export const echoSlice = createSlice({
  name: 'core/echo',
  initialState: {} as EchoState,
  reducers: {
    updateStatus: (
      state,
      action: PayloadAction<CoreInterfaces.ConnectionStatus | null>
    ) => {
      state.status = action.payload;
    },
  },
});
