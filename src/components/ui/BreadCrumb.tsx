import React from "react";
import Link from "next/link";

const BreadCrumb = ({
  items,
}: {
  items: {
    name: string;
    slug: string;
  }[];
}) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link href={item.slug}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreadCrumb;
