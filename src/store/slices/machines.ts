import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'machine',
  storage: AsyncStorage,
};

export interface IAttribute {
  id: number;
  name: string;
  type: "date" | "text" | "checkbox" | "number";
}

export interface IMachineType {
  id: number;
  title: string;
  attributes: IAttribute[];
  titleAttr: number;
  machines: { [key: string]: any; }[];
  isNew?: boolean;
};

const initialState = {
  types: [] as IMachineType[]
};

const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  reducers: {
    addType(state, action) {
      state.types = [
        ...state.types,
        action.payload,
      ];
    },
    updateType(state, action) {
      const data = action.payload as IMachineType;
      state.types = state.types.map((el) => {
        if (el.id === data.id) {
          data.machines = data.machines.map((machine) => {
            const newMachine = {} as { [key: string]: any; };

            data.attributes.forEach((attr) => {
              const oldAttr = el.attributes.find((a) => a.id === attr.id);

              if (!oldAttr || attr.type !== oldAttr.type) {
                // set new values if new attribute or type is changed
                newMachine[attr.name] = attr.type === "checkbox" ? false : "";
              } else {
                newMachine[attr.name] = machine[oldAttr.name];
              }
            })

            return newMachine;
          })

          return data;
        }

        return el;
      });
    },
    deleteType(state, action) {
      state.types = state.types.filter((el) => el.id !== action.payload);
    },
    addMachine(state, action) {
      state.types = state.types.map((el) => {
        if (el.id === action.payload) {
          const newMachine = {} as { [key: string]: any; };

          el.attributes.forEach((attr) => {
            newMachine[attr.name] = attr.type === "checkbox" ? false : "";
          })

          return {
            ...el,
            machines: [
              ...el.machines,
              newMachine
            ]
          }
        }

        return el;
      });
    },
    updateMachine(state, action) {
      const { typeId, id, data } = action.payload;

      state.types = state.types.map((el) => {
        if (el.id === typeId) {
          return {
            ...el,
            machines: el.machines.map((machine, idx) => idx === id ? data : machine)
          }
        }

        return el;
      });
    },
    deleteMachine(state, action) {
      const { typeId, id } = action.payload;

      state.types = state.types.map((el) => {
        if (el.id === typeId) {
          return {
            ...el,
            machines: el.machines.filter((_, idx) => id !== idx)
          }
        }

        return el;
      });
    }
  }
});

export const {
  addType,
  updateType,
  deleteType,
  addMachine,
  updateMachine,
  deleteMachine,
} = machinesSlice.actions;

export default persistReducer(persistConfig, machinesSlice.reducer);
