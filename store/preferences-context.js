import { createContext, useReducer } from 'react';

export const PreferencesContext = createContext({
  preferences: [],
  addPreference: ({ description, amount, date }) => {},
  setPreferences: (preferences) => {},
  deletePreference: (id) => {},
  updatePreference: (id, { description, amount, date }) => {},
});

function preferencesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [{ ...action.payload }, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updatablePreferenceItemIndex = state.findIndex(
        (preferenceItem) => preferenceItem.id === action.payload.id,
      );
      const updatablePreferenceItem = state[updatablePreferenceItemIndex];
      const updatedPreferenceItem = {
        ...updatablePreferenceItem,
        ...action.payload.data,
      };
      const updatedPreferences = [...state];
      updatedPreferences[updatablePreferenceItemIndex] = updatedPreferenceItem;
      return updatedPreferences;
    case 'DELETE':
      return state.filter(
        (preferenceItem) => preferenceItem.id !== action.payload,
      );
    default:
      return state;
  }
}

function PreferencesContextProvider({ children }) {
  const [preferencesState, dispatch] = useReducer(preferencesReducer, []);

  function addPreference(preferenceData) {
    dispatch({ type: 'ADD', payload: preferenceData });
  }

  function setPreferences(preferences) {
    dispatch({ type: 'SET', payload: preferences });
  }

  function deletePreference(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updatePreference(id, preferenceData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: preferenceData } });
  }

  const value = {
    preferences: preferencesState,
    setPreferences: setPreferences,
    addPreference: addPreference,
    deletePreference: deletePreference,
    updatePreference: updatePreference,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export default PreferencesContextProvider;
