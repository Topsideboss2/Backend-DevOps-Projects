import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function ThemingTable() {
    return (
        <div>
            <SkeletonTheme color="grey" highlightColor="#444">
                <p>
                    <Skeleton height={20}  count={1} duration={1} />
                </p>

            </SkeletonTheme>
            <SkeletonTheme color="#990" highlightColor="#550">
                <p>
                    <Skeleton height={10} style={{width:"100vw"}} count={5} />
                </p>
 
            </SkeletonTheme>
        </div>
    )
}
