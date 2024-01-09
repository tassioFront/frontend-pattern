export interface TypographyTypes {
  label: string;
  tag: 'h1' | 'h2' | 'h3';
  id: string;
  className?: string;
}

export const component = ({
  label,
  tag,
  id,
}: Omit<TypographyTypes, 'className'>): string =>
  `<${tag} id="${id}" title=${label}>${label}</${tag}>`;

const Typography = ({
  label,
  id,
  tag,
  className,
}: TypographyTypes): JSX.Element => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: component({ tag, label, id }),
      }}
    />
  );
};

export default Typography;
