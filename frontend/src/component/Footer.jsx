

const Footer = () => {

  return (
    <footer className="py-6 md:py-0 md:px-8 bg-black text-white border-t-2 border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:h-24" >
            <p className="text-balance text-sm text-center md:text-left leading-loose">
                Built by{" "}
                <a
                    href='https://github.com/vinayakpatle'
                    target='_blank'
                    className="font-medium underline underline-offset-4"
                    rel='noopener'
                >
                    you
                </a>
                    . The source code is available on{" "}
                <a
                    href='https://github.com/vinayakpatle'
                    target='_blank'
                    className="font-medium underline underline-offset-4"
                    rel='noreferrer' // netflix from gitHub ,there is no refferer from gitHub to netflix website it block window.openar
                >
                    GitHub
                </a>
            </p>
        </div>
    </footer>
  )
}

export default Footer