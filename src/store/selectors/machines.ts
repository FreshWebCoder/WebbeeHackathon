import { createSelector } from "@reduxjs/toolkit";
import { State } from "../index";

const selectMachines = (state: State) => state.machines;

export const getMachines = createSelector(selectMachines, (data) => data.types);
export const getMachineById = (id: number) =>
    createSelector(selectMachines, (data) => data.types.find((el) => el.id === id));
