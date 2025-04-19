import { useEffect } from "react";

type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null; // It doesn't render anything visually
};

export default PageTitle;
