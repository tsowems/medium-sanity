import Head from 'next/head'
import Header from "../components/Header";
import Link from 'next/link';
import {sanityClient, urlFor} from '../sanity';
import {Post} from "../typings";


interface Props {
  posts: [Post];
}

export default function Home({posts}: Props) {
  console.log(posts)
  return (
    <div className="max-w-7xl max-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <title>Medium Blog</title>
      </Head>
      <Header />
      <div className="flex justify-between items-center bg-yellow-400 border-y
       border-black py-10 lg:py0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif"><span className="underline decoration-black decoration-4">Medium</span> Stay curious.</h1>
          <h2>Discover stories, thinking, and expertise from writers on any topic.</h2>        </div>
        <div className="">
          <img className="hidden md:inline-flex h-32 lg:h-full"
           src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="" />
        </div>
      </div>

      {/* post from sanity CMS */}
      <div>
      {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div>
              {post.mainImage &&(
                 <img src={
                  urlFor(post.mainImage).url()!
                } alt="" />
              )}
             
            </div>
          </Link>
        ))} 
          </div>
          </div>
        );
        }
  
export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
  }
  `;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  }

};
