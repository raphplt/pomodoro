import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
	return (
		<footer className="flex justify-center gap-2 items-center h-16 bg-black text-white">
			Made with
			<FontAwesomeIcon icon={faHeart} className="mx-1 text-red-500" />
			by{" "}
			<a
				href="https://github.com/raphplt
                "
			>
				Raphaël
			</a>
		</footer>
	);
}
