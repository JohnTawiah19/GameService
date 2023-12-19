type Props = {
  children: React.ReactNode;
};

export function Container({ children }: Props) {
  return <div className="max-w-full ">{children}</div>;
}
