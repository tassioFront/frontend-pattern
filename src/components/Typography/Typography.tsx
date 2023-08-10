interface TypographyTypes {
  label: string;
  tag: 'h1' | 'h2' | 'h3';
  id: string;
}

export const component = ({ label, tag, id }: TypographyTypes): string =>
  `<${tag} id="${id}">${label}</${tag}>`;

const Typography = ({ label, id, tag }: TypographyTypes): JSX.Element => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: component({ tag, label, id }),
      }}
    />
  );
};

export default Typography;
