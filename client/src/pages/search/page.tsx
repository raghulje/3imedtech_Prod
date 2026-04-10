import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { trackEvent } from '../../utils/analytics';

interface SearchResult {
  id: number;
  title: string;
  date: string;
  url: string;
  pageNumber: number;
  displayOrder: number;
}

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('s') || '';
  const pageParam = parseInt(searchParams.get('page') || '1');
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    fetchSearchResults();
  }, [currentPage]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      // Fetch all results to get total count
      const allRes = await fetch('/api/cms/search-results');
      if (allRes.ok) {
        const allData = await allRes.json();
        const allResults = Array.isArray(allData?.data) ? allData.data : [];
        setTotalResults(allResults.filter((r: any) => r.isActive && !r.isDeleted).length);
      }

      // Fetch results for current page
      const res = await fetch(`/api/cms/search-results/page/${currentPage}`);
      if (res.ok) {
        const json = await res.json();
        const results = Array.isArray(json?.data) ? json.data : [];
        // Calculate index numbers (1-10 for page 1, 11-20 for page 2, etc.)
        const resultsWithIndex = results.map((result: SearchResult, idx: number) => ({
          ...result,
          index: (currentPage - 1) * 10 + idx + 1
        }));
        setSearchResults(resultsWithIndex);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Track search event (NO search text / PII sent)
    try {
      trackEvent('search', 'engagement', 'site_search');
    } catch {
      // Ignore analytics errors
    }
    navigate(`/search?s=${encodeURIComponent(searchInput)}&page=1`);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/search?s=${encodeURIComponent(searchQuery)}&page=${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resultsPerPage = 10;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Page Title Section */}
      <div className="bg-white py-12 border-b border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-[#4A90A4] text-center" data-aos="fade-up">
            {totalResults} search results for "{searchQuery || '""'}"
          </h1>
        </div>
      </div>

      {/* Search Form */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            <div className="relative">
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search …"
                className="w-full px-6 py-4 text-base border border-gray-300 rounded-md focus:outline-none focus:border-[#4A90A4] transition-colors shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4A90A4] transition-colors"
              >
                <i className="ri-search-line text-xl"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((result, idx) => (
                  <article
                    key={result.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                    data-aos="fade-up"
                    data-aos-delay={idx * 50}
                  >
                    <Link to={result.url} className="block p-6 relative">
                      <div className={`absolute top-6 right-6 w-12 h-12 rounded-bl-3xl flex items-center justify-center text-white font-bold text-sm shadow-lg transform group-hover:scale-110 transition-transform duration-300 ${
                        result.index === 3 ? 'bg-gradient-to-br from-[#4A90A4] to-[#027C8E]' : 'bg-gradient-to-br from-[#E6662F] to-[#FF8C5A]'
                      }`}>
                        {result.index}
                      </div>
                      
                      <h2 className="text-xl font-bold text-[#1E4C84] mb-3 pr-16 group-hover:text-[#4A90A4] transition-colors duration-300">
                        {result.title}
                      </h2>
                      
                      <span className="text-sm text-gray-600">
                        {result.date}
                      </span>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2" data-aos="fade-up" data-aos-delay="200">
                  {currentPage > 1 && (
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="px-4 py-2 rounded bg-white text-[#1E4C84] border border-gray-300 hover:bg-gray-50 transition-colors duration-300"
                    >
                      <i className="ri-arrow-left-s-line"></i>
                    </button>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded transition-colors duration-300 ${
                        currentPage === page
                          ? 'bg-[#4A90A4] text-white'
                          : 'bg-white text-[#1E4C84] border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  {currentPage < totalPages && (
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="px-4 py-2 rounded bg-white text-[#1E4C84] border border-gray-300 hover:bg-gray-50 transition-colors duration-300"
                    >
                      <i className="ri-arrow-right-s-line"></i>
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No search results found.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
