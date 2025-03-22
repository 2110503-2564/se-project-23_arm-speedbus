import Link from "next/link";

export default function manageChoice(){
    return (
        <>
        <Link href={"/manage/provider"}><div className="text-xl">Manage Providers</div></Link>
        <Link href={"/manage/car"}><div className="text-xl">Manage Cars</div></Link>
        </>
    )
}