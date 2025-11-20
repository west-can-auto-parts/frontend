import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

const LOGO_SRC =
  "https://westcanauto.com/wp-content/uploads/2023/05/WestCanAP_logoNOUSI-300x156.png";

export const Logo = ({ className = "", priority = false }: LogoProps) => {
  return (
    <Image
      src={LOGO_SRC}
      alt="WestCan Auto Logo"
      width={300}
      height={156}
      priority={priority}
      className={className}
      sizes="(max-width: 768px) 350px, 500px"
    />
  );
};

