import { createContext, useReducer } from 'react';

export const ContentContext = createContext({
  content: [],
  addContent: ({ description, amount, date }) => {},
  setContent: (content) => {},
  deleteContent: (id) => {},
  updateContent: (id, { description, amount, date }) => {},
});

function contentReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      // TODO: Update new id creation from database
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload }, ...state];
    case 'SET':
      return action.payload;
    case 'UPDATE':
      const updatableContentItemIndex = state.findIndex(
        (contentItem) => contentItem.id === action.payload.id,
      );
      const updatableContentItem = state[updatableContentItemIndex];
      const updatedContentItem = {
        ...updatableContentItem,
        ...action.payload.data,
      };
      const updatedContent = ([updatableContentItemIndex] = updatedContentItem);
      return updatedContent;
    case 'DELETE':
      return state.filter((contentItem) => contentItem.id !== action.payload);
    default:
      return state;
  }
}

function ContentContextProvider({ children }) {
  const [contentState, dispatch] = useReducer(contentReducer, []);

  function addContent({ contentData }) {
    dispatch({ type: 'ADD', payload: contentData });
  }

  function setContent(content) {
    dispatch({ type: 'SET', payload: content });
  }

  function deleteContent(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateContent(id, contentData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: contentData } });
  }

  const value = {
    content: contentState,
    setContent: setContent,
    addContent: addContent,
    deleteContent: deleteContent,
    updateContent: updateContent,
  };

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export default ContentContextProvider;
