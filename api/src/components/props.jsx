/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

export const Buttton_ = ({
  text,
  className,
  children,
  onClick,
  style,
  active,
}) => (
  <>
    <button
      className={`${className}`}
      onClick={onClick}
      style={style}
      disabled={active}
    >
      {text}
      {children}
    </button>
  </>
);

export const Link_ = ({ text, className, ref }) => (
  <a href={ref} className={`${className}`}>
    {text}
  </a>
);

export const Product_ = ({ img, text, price, desc, onClick, active }) => (
  <div className="flex flex-col py-2 px-4 bg-white gap-3 font-Outfit justify-between">
    <img src={img} alt={`product-${text}`} className="w-full" />
    <div className="flex flex-col gap-2">
      {/* name and price */}
      <div className="flex justify-between items-start text-sm md:text-xl text-primary">
        <span className="max-w-[10rem] lg:max-w-[14rem] font-Anton w-full truncate hover:overflow-visible">
          {text}
        </span>
        <span className="min-w-fit">{"₵ " + price}</span>
      </div>
      {/* description */}
      <p className=" text-secondary text-sm md:text-lg">{desc}</p>
    </div>
    <Buttton_
      text={"Add to cart"}
      className={`inline-flex bg-primary text-[#ffffff] gap-2 p-2 w-fit text-sm md:text-base items-center disabled:bg-secondary disabled:cursor-not-allowed`}
      onClick={onClick}
      active={active}
    >
      <span className="material-icons-outlined lg:!text-2xl md:!text-lg !text-sm">
        shopping_cart
      </span>
    </Buttton_>
  </div>
);

export const scrollToElement = ({ id, navigate }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  try {
    const element = document.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });

      return navigate(`/#${id}`, { replace: true });
    }
  } catch (error) {
    navigate("/", { replace: true });
    return setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1);
  } finally {
    if (id === "products") {
      try {
        setTimeout(() => {
          const element = document.querySelector(`#products`) || 0;
          if (element) {
            element?.scrollIntoView({
              behavior: "smooth",
            });

            return navigate(`/#${id}`, { replace: true });
          }
        }, 1);
      } catch (error) {
        // eslint-disable-next-line no-unsafe-finally
        return;
      }
    }
  }
};
