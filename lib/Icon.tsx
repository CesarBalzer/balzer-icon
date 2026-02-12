import icons from "./svg";

export type IconName = keyof typeof icons;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 30,
  ...props
}) => {
  const Component = icons.hasOwnProperty(name) ? icons[name] : icons["alert-circle"];

  return (
    <Component
      {...props}
      height={props.height || size}
      width={props.width || size}
    />
  );
}

export default Icon;