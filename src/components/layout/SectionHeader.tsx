type SectionHeaderProps = {
  header: string;
  color: string;
};

export default function SectionHeader({ header, color }: SectionHeaderProps) {
  return (
    <div className="w-full flex justify-center mb-12 lg:mb-24">
      <div className={`flex items-center gap-1.5 text-${color}`}>
        <div className={`kick-bass-square bg-${color} animate-pulse`} />
        <h2 className="offbit-101-bold uppercase tracking-wide fluid-text--base">{header}</h2>
      </div>
    </div>
  );
}
