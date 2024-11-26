import Link from 'next/link'

const Form = ({post, setPost, submitting, handleSubmit}) => {
  
  return (
    <section className='place-content-center'>
      <h1 className='head_text text-center'>
        <span className='pink_gradient'>Create Prompt</span>
      </h1>
      <p className='m-3 text-center max-w-md anton-regular'>
        Create and share amazing prompts with the AI World, and let your
        imagination run wild with any AI-powered platform
      </p>
      {/* form section */}
      
      <form
        onSubmit={handleSubmit}
        className='mt-3 p-5 w-full max-w-2xl flex flex-col gap-7'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-white-700'>
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your post here'
            required
            className='form_textarea'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-white-700'>
            Field of Prompt{" "}
            <span className='font-normal'>
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-white-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? 'Creating' : 'Create'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
