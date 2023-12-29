
import { Star, StarHalf } from "lucide-react";

type CommentBarProps = {
  text:string,
  author:string,
  stars:number,
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function CommentBar({
  text,author,stars
}: CommentBarProps) {

  return (
    <div 
    // id={id.toString()}
    className="block gap-4 border rounded-md p-2 mx-2 my-2 mg-2"
    >
      <div className="flex">
      <p className="font-bold">{author}</p>   
      <div className="flex mx-3">
          <button className="flex">
            {stars >= 0.75 ? (
              <Star fill="orange" strokeWidth={0} />
            ) : stars >= 0.25 ? (
              <StarHalf fill="orange-800" strokeWidth={0} />
            ) : (
              <Star fill="black" strokeWidth={0} />
            )}
          </button>
          <button className="flex">
            {stars >= 1.75 ? (
              <Star fill="orange" strokeWidth={0} />
            ) : stars >= 1.25 ? (
              <StarHalf fill="orange" strokeWidth={0} />
            ) : (
              <Star fill="black" strokeWidth={0} />
            )}
          </button>
          <button className="flex">
            {stars >= 2.75 ? (
              <Star fill="orange" strokeWidth={0} />
            ) : stars >= 2.25 ? (
              <StarHalf fill="orange" strokeWidth={0} />
            ) : (
              <Star fill="black" strokeWidth={0} />
            )}
          </button>
          <button className="flex">
            {stars >= 3.75 ? (
              <Star fill="orange" strokeWidth={0} />
            ) : stars >= 3.25 ? (
              <StarHalf fill="orange" strokeWidth={0} />
            ) : (
              <Star fill="black" strokeWidth={0} />
            )}
          </button>
          <button className="flex">
            {stars >= 4.75 ? (
              <Star fill="orange" strokeWidth={0} />
            ) : stars >= 4.25 ? (
              <StarHalf fill="orange" strokeWidth={0} />
            ) : (
              <Star fill="black" strokeWidth={0} />
            )}
          </button>

      </div>
      
    </div>
      

      <article className="mx-6 whitespace-pre-wrap break-all">{text}</article>
    </div>
  );
}
