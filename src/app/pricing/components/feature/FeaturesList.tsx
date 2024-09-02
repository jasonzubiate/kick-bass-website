import { IFeature, IFeatureFields } from "@/lib/contentful/contentful";
import { IoIosCheckmark } from "react-icons/io";

type FeaturesListProps = {
  features: IFeatureFields[];
  packages: { title: string; color: string; features: IFeature[] }[];
};

export default function FeaturesList({
  features,
  packages,
}: FeaturesListProps) {
  return (
    <table id="features-table">
      <thead>
        <tr className="table__row">
          <th className="text-start fluid-text--lg">Features</th>
          <th className="bg-black text-softBlue fluid-text--lg">Basic</th>
          <th className="text-hardLime fluid-text--lg">Standard</th>
          <th className="bg-black text-softPink fluid-text--lg">Premium</th>
        </tr>
      </thead>
      <tbody>
        {features.map((feature, index) => (
          <tr key={index} className="table__row">
            <td className="fluid-text--base">{feature.title}</td>

            {packages.map((pkg, index) => {
              const hasFeature =
                pkg.features &&
                pkg.features.some(
                  (f) => (f.fields as IFeatureFields).title === feature.title
                );

              return (
                <td
                  key={index}
                  className={`${index % 2 === 0 ? "bg-black" : ""}`}
                >
                  <IoIosCheckmark
                    className="text-[clamp(48px,3.5vw,128px)] mx-auto"
                    style={{
                      color: pkg.color as string,
                      opacity: hasFeature ? 1 : 0.2,
                    }}
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
