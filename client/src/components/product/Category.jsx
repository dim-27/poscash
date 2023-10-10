const Category = ({ category }) => {
  return (
    <div className="flex shrink-0 lg:shrink w-[100px] group text-center flex-col items-center gap-2 cursor-pointer">
      <div className="w-14 h-14 bg-background hover:bg-secondary border border-primary dark:border-border rounded-full grid place-content-center">
        <span className="text-primary dark:text-primary-foreground  transform transition-all duration-100 group-hover:-translate-y-[2px]">
          icon
        </span>
      </div>
      <span className="whitespace-break-spaces text-xs font-bold text-primary dark:text-primary-foreground">
        {category}
      </span>
    </div>
  )
}

export default Category
