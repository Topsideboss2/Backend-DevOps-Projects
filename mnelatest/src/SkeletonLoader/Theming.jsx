import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Theming() {
    return (
        <div>
            <SkeletonTheme color="grey" highlightColor="#444">
                <p>
                    <Skeleton height={250} width={300} count={1} duration={1} />
                </p>

            </SkeletonTheme>
            <SkeletonTheme color="#990" highlightColor="#550">
                <p>
                    <Skeleton height={250} width={300} count={4} />
                </p>

            </SkeletonTheme>
        </div>
    )
}
