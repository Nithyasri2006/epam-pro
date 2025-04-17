function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p>A community-driven forum for discussions, knowledge sharing, and collaboration.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/categories" className="hover:text-primary">Categories</a></li>
              <li><a href="/discussions" className="hover:text-primary">Discussions</a></li>
              <li><a href="/guidelines" className="hover:text-primary">Guidelines</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Email: support@forum.com</li>
              <li>Follow us on social media</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-black py-4 text-center">
        <p className="text-sm">Developed by Nithya sri induru - 2300030254</p>
      </div>
    </footer>
  );
}

export default Footer;