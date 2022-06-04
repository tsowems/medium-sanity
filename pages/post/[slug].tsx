import {sanityClient, urlFor} from "../../sanity"
import Header from "../../components/Header"
import {getStaticPath} from 'next';
import {Post} from "../../typings"

interface Props {
    post: Post;
}

function Post({post}: Props) {
  return <main>
      <Header />
  </main>
    
}

export default Post;

export const getStaticPaths = async () => {
    const query = `*[_type == "post"]{
        id,
        slug {
            current
        }
    }`;

    const post  = await sanityClient.fetch(query);

    const paths = post.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking',
    };
} ;

export const getStaticProps: GetStaticProps = async({params}) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author->{
            name,
            image
        },
        'comments': *[
            _type == "comment" &&
            post.ref == ^._id &&
            approved == true],
        description,
        mainImage,
        slug,
        body
        }`

        const post = await sanityClient.fetch(query, {
            slug: params?.slug,
        });

        if(!post) {
            return {
                notFound: true
            }
        }
        return {
            props: {
                post,
            },
        };
};