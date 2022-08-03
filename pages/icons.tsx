import { iconsArray } from "../src/constants/appConstants";
import HomeLayout from "../src/layouts/HomeLayout";
import { combineClasses } from "../src/utils/utils";
import Text from "../src/components/Text";
import { TextAs } from "../src/shared/enums";

const Icons = () => {
    return (
        <HomeLayout>
            <div className="container mt-10">
                <div className="px-15">
                    <Text as={TextAs.title} className="md:text-3xl">
                        Icons
                    </Text>
                    <p className="mb-10 mt-5">
                        To use these icons, simply copy the text below the icon and paste in className in {"<i />"} tag, and to change the size and color of the icon use font attributes like text-sm or text-[12px] and text-blue-800 in className.

                        <br /> <br />
                        Example: {'<i className="icon-A text-[80px] text-blue-800" />'}
                        <br />
                        <i className="icon-A text-[80px] text-blue-800" />
                    </p>
                </div>
                <hr />
                <div className="flex flex-wrap justify-around">
                    {
                        iconsArray.map((icon, i) => {
                            return (
                                <div key={icon + i} className="flex flex-col text-center md:px-[46px] px-[30px] py-3" style={{ flexShrink: 0, minWidth: "100px" }} >

                                    <i className={combineClasses(icon, 'text-[80px]')} />
                                    <p className="font-light text-sm mt-3">{icon}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </HomeLayout>
    )
}

export default Icons;