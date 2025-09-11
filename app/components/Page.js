import React, { useEffect } from "react";
import Container from "./Container";
import { UseGlobalDispatch } from './Context/GlobalContext';

function Page({ title, description, wide, bodyClass, children }) {
  const { appDispatch } = UseGlobalDispatch();

  useEffect(() => {
    document.title = `${title} | Reserve and Go`;
    document.body.classList.add(bodyClass);
    window.scrollTo(0, 0);

    appDispatch({ type: 'setPageInfo', value: { title, description  } });

    // cleanup: remove it on unmount or before next bodyClass is applied
    return () => {
      document.body.classList.remove(bodyClass);
      appDispatch({ type: 'setPageInfo', value: { title: '', description: '' } });
    };
  }, [title, description, bodyClass])

  return (
    <Container wide={ wide }>{ children }</Container>
  );
}

export default Page;
