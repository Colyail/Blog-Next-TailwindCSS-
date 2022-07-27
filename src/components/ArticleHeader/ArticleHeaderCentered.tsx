import Link from "next/link"
import { IArticleHeaderData } from "../../shared/interfaces"
import { combineClasses } from "../../utils/utils"
import classes from './ArticleHeader.module.scss'
interface IProps {
    headerData: IArticleHeaderData
}
const ArticleHeaderCenter = ({ headerData }: IProps) => {
    return (
        <div className="mb-[30px]">
            <h1 className={combineClasses(classes.articleTitle, "text-center text-2xl md:text-4xl font-medium mt-[20px] mb-[5px]")}>
                {headerData.articleTitle}
            </h1>
            <div className={combineClasses("mb-[10px] mt-[15px] text-[14px] font-medium", classes.centered_article_header_author)}>
                <p className={'my-0 mx-[30px]'}>
                    {headerData.author.name}
                </p>
                {
                    headerData.category && <p className="my-0 mx-[30px]">
                        <Link href={"/blog?category=" + headerData.category} passHref={true}>
                            <a>{headerData.category}</a>
                        </Link>
                    </p>
                }
                <p className="my-0">{headerData.date}</p>
            </div>
            <div className="text-center">
                {
                    headerData.tags.split(',').map((each, i) => (
                        <span key={i} className="text-xs font-regular text-gray-700 mr-[10px]" >#{each}</span>
                    ))
                }
            </div>
        </div>
    )
}

export default ArticleHeaderCenter