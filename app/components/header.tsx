import Image from "next/image";
import logo from "../../public/logo.png";

export default function Header() {
	return (
		<header className=" pt-3">
			<div className=" flex justify-evenly items-center mx-auto w-1/2">
				<Image src={logo} alt="Logo" width={200} height={200} />

			</div>
		</header>
	);
}
