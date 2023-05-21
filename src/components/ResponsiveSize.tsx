const ResponsiveSize = () => (
  <>
    <div className="sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
      mobile screen.
    </div>
    <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
      small screen.
    </div>
    <div className="hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden">
      medium screen.
    </div>
    <div className="hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden">
      large screen.
    </div>
    <div className="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">
      This is an extra-large screen.
    </div>
    <div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">
      2XL screen.
    </div>
  </>
);

export default ResponsiveSize;
