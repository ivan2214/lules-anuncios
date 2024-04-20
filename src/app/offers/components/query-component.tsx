"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { createUrl } from "@/lib/utils";

interface ParamsOffersPageProps {
  sort?: string;
  filter?: string;
  category?: string;
  search?: string;
}

interface QueryComponentProps {
  searchParams?: ParamsOffersPageProps;
}

export const QueryComponent: React.FC<QueryComponentProps> = ({
  searchParams,
}) => {
  const { sort, filter, category, search } = searchParams || {};
  const router = useRouter();
  const pathname = usePathname();
  let categoriesArray = category?.split(",");

  const removeQuery = ({
    param,
    value,
  }: {
    param: "category" | "search" | "sort" | "filter";
    value?: string;
  }) => {
    const params = { ...searchParams };

    if (param === "search") {
      delete params.search;
    }

    if (param === "sort") {
      delete params.sort;
    }

    if (param === "filter") {
      delete params.filter;
    }

    if (param === "category" && value) {
      const updatedCategories = category
        ?.split(",")
        .filter((cat) => cat !== value)
        .join(",");
      if (updatedCategories) {
        params.category = updatedCategories;
      } else {
        delete params.category;
      }
    }

    const queryParams = new URLSearchParams(params).toString();
    const url = `${pathname}?${queryParams}`;

    router.push(url);
    router.refresh();
  };

  const clearAll = () => {
    categoriesArray = [];
    router.push(`${pathname}`);
    router.refresh();
  };
  return (
    <div className="flex lg:justify-between lg:items-center lg:flex-row flex-col gap-4 lg:gap-0">
      <div className="mt-4 flex flex-wrap gap-2 w-full">
        {category &&
          categoriesArray?.map((category) => (
            <Badge
              key={category}
              className="flex items-center justify-between capitalize"
              variant="outline"
            >
              {category}
              <Button
                onClick={() =>
                  removeQuery({
                    param: "category",
                    value: category,
                  })
                }
                variant="ghost"
                size="icon"
              >
                <TrashIcon className="h-4 w-4 text-destructive" />
              </Button>
            </Badge>
          ))}
        {filter && (
          <Badge
            className="flex items-center justify-between capitalize"
            variant="outline"
          >
            {filter}
            <Button
              onClick={() =>
                removeQuery({
                  param: "filter",
                  value: filter,
                })
              }
              variant="ghost"
              size="icon"
            >
              <TrashIcon className="h-4 w-4 text-destructive" />
            </Button>
          </Badge>
        )}
        {sort && (
          <Badge
            className="flex items-center justify-between capitalize"
            variant="outline"
          >
            {sort}
            <Button
              onClick={() =>
                removeQuery({
                  param: "sort",
                  value: sort,
                })
              }
              variant="ghost"
              size="icon"
            >
              <TrashIcon className="h-4 w-4 text-destructive" />
            </Button>
          </Badge>
        )}
        {search && (
          <Badge
            className="flex items-center justify-between capitalize"
            variant="outline"
          >
            {search}
            <Button
              onClick={() =>
                removeQuery({
                  param: "search",
                  value: search,
                })
              }
              variant="ghost"
              size="icon"
            >
              <TrashIcon className="h-4 w-4 text-destructive" />
            </Button>
          </Badge>
        )}
      </div>
      <Button
        className="flex items-center gap-2 w-fit "
        onClick={clearAll}
        variant="destructive"
        
      >
        Borrar todos
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
