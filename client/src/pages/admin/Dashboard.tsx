import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminContext';
import { useAdminAuthStore } from '../../store/adminAuthStore';
import { ASSETS } from '../../constants/assets';

// Import all page CMS components
import {
  UserManagement_cms, UserManagementForm,
  SearchResults_cms, SearchResultsForm,
  HomePage_cms,
  HeaderFooter_cms,
  AboutPage_cms,
  MissionVisionPage_cms,
  WhyChooseUsPage_cms,
  ContactPage_cms,
  PortableXRayPage_cms, PortableXRayHeroForm, PortableXRayProductForm,
  RadiographySystemsPage_cms, RadiographySystemsHeroForm, RadiographySystemsProductForm,
  MammographySystemsPage_cms, MammographySystemsHeroForm, MammographySystemsProductForm,
  FlatPanelDetectorsPage_cms, FlatPanelDetectorsHeroForm, FlatPanelDetectorsProductForm,
  RefurbishedMRISystemsPage_cms, RefurbishedMRISystemsHeroForm, RefurbishedMRISystemsProductForm,
  ImagingAccessoriesPage_cms, ImagingAccessoriesHeroForm, ImagingAccessoriesProductForm,
  FPDCArmPage_cms, FPDCArmHeroForm, FPDCArmContentForm
} from './pages/index';

import { getApiUrl } from './shared/utils';
import { showToast } from '../../components/admin/Toast';
import { NavigationLinksManager } from './pages/header-footer/NavigationLinksManager';
import { DynamicParagraphsField } from './pages/about-page/DynamicParagraphsField';
import { OfferingsListItemsField } from './pages/why-choose-us-page/OfferingsListItemsField';

interface AdminData {
  products: any[];
  users: any[];
  orders: any[];
  analytics: any;
  settings: any;
  aboutHero: {
    title: string;
    subtitle?: string;
    description?: string;
    backgroundImage: string;
    isActive?: boolean;
  };
  aboutJourneyImage: string;
  visionMission: any;
  heroSlides: any[];
  statistics: any[];
  regulatoryApprovals: any[];
  aboutSections: any[];
  values: any[];
  journey: any[];
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, data, logout, addItem, updateItem, deleteItem, updateData } = useAdminAuth();
  const token = useAdminAuthStore((state) => state.token);
  const zustandUser = useAdminAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState('home-page');
  
  // Check user permissions and redirect if needed
  useEffect(() => {
    const currentUser = zustandUser || user;
    const isAdmin = currentUser?.user_type === 'Admin';
    const allowedPages = currentUser?.allowed_cms_pages 
      ? (typeof currentUser.allowed_cms_pages === 'string' 
          ? JSON.parse(currentUser.allowed_cms_pages) 
          : currentUser.allowed_cms_pages)
      : [];
    
    // Only check permissions for non-admin users
    if (!isAdmin && activeTab !== 'user-management') {
      if (!allowedPages.includes(activeTab)) {
        if (allowedPages.length > 0) {
          setActiveTab(allowedPages[0]);
        } else {
          // No pages allowed, show message
          showToast.error('You do not have access to any CMS pages. Please contact an administrator.');
        }
      }
    }
    
    // User Management is only for admins - redirect if non-admin tries to access
    if (activeTab === 'user-management' && !isAdmin) {
      if (allowedPages.length > 0) {
        setActiveTab(allowedPages[0]);
      } else {
        showToast.error('You do not have access to User Management.');
        // Set to first available page if any
        const allTabs = ['home-page', 'header-footer', 'about-page', 'mission-vision-page', 'why-choose-us-page', 'contact-page', 'portable-xray-page', 'radiography-page', 'flat-panel-page', 'mammography-page', 'mri-page', 'imaging-accessories-page', 'fpd-carm-page'];
        const firstAllowed = allTabs.find(tab => allowedPages.includes(tab));
        if (firstAllowed) {
          setActiveTab(firstAllowed);
        }
      }
    }
  }, [activeTab, zustandUser, user]);
  const [activeHomeSection, setActiveHomeSection] = useState('hero');
  const [activeAboutSection, setActiveAboutSection] = useState('about-hero');
  const [activeMissionVisionSection, setActiveMissionVisionSection] = useState('hero');
  const [activeWhyChooseUsSection, setActiveWhyChooseUsSection] = useState('hero');
  const [activeContactSection, setActiveContactSection] = useState('hero');
  const [activeImagingAccessoriesSection, setActiveImagingAccessoriesSection] = useState('hero');
  const [activeSearchResultsSection, setActiveSearchResultsSection] = useState('results');
  const [activeProductsSection, setActiveProductsSection] = useState<'hero'>('hero');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [productsHero, setProductsHero] = useState<any>(null);

  // Preview functionality
  const [previewMode, setPreviewMode] = useState(false);
  const [previewSection, setPreviewSection] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<any>(null);

  // Header and Footer state
  const [headerData, setHeaderData] = useState<any>(null);
  const [footerData, setFooterData] = useState<any>(null);

  // Fetch Header and Footer
  const fetchHeader = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/header-footer/header'));
      if (res.ok) {
        const json = await res.json();
        setHeaderData(json?.data || json || null);
      }
    } catch { }
  };
  const fetchFooter = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/header-footer/footer'));
      if (res.ok) {
        const json = await res.json();
        setFooterData(json?.data || json || null);
      }
    } catch { }
  };
  useEffect(() => {
    fetchHeader();
    fetchFooter();
  }, []);

  // Commitment Cards state
  const [commitmentCards, setCommitmentCards] = useState<any[]>([]);

  // API-backed Imaging Accessories data
  const [imagingAccessoriesHero, setImagingAccessoriesHero] = useState<any>(null);
  const [imagingAccessoriesProducts, setImagingAccessoriesProducts] = useState<any[]>([]);

  // API-backed Search Results data
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // API-backed User Management data
  const [users, setUsers] = useState<any[]>([]);

  // API-backed Portable X-Ray data
  const [portableXRayHero, setPortableXRayHero] = useState<any>(null);
  const [portableXRayOverview, setPortableXRayOverview] = useState<any>(null);
  const [portableXRayFeatures, setPortableXRayFeatures] = useState<any[]>([]);
  const [portableXRaySpecifications, setPortableXRaySpecifications] = useState<any[]>([]);
  const [portableXRayProducts, setPortableXRayProducts] = useState<any[]>([]);
  const [activePortableXRaySection, setActivePortableXRaySection] = useState('hero');

  // API-backed Radiography data
  const [radiographyHero, setRadiographyHero] = useState<any>(null);
  const [radiographyProducts, setRadiographyProducts] = useState<any[]>([]);
  const [activeRadiographySection, setActiveRadiographySection] = useState('hero');

  // API-backed Flat Panel data
  const [flatPanelHero, setFlatPanelHero] = useState<any>(null);
  const [flatPanelProducts, setFlatPanelProducts] = useState<any[]>([]);
  const [activeFlatPanelSection, setActiveFlatPanelSection] = useState('hero');

  // API-backed Mammography data
  const [mammographyHero, setMammographyHero] = useState<any>(null);
  const [mammographyProducts, setMammographyProducts] = useState<any[]>([]);
  const [activeMammographySection, setActiveMammographySection] = useState('hero');

  // API-backed Refurbished MRI data
  const [refurbishedMRIHero, setRefurbishedMRIHero] = useState<any>(null);
  const [refurbishedMRIProducts, setRefurbishedMRIProducts] = useState<any[]>([]);
  const [activeRefurbishedMRISection, setActiveRefurbishedMRISection] = useState('hero');

  const fetchImagingAccessoriesHero = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/imaging-accessories/hero'));
      if (res.ok) {
        const json = await res.json();
        setImagingAccessoriesHero(json?.data || json || null);
      }
    } catch { }
  };
  const fetchImagingAccessoriesProducts = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/imaging-accessories/products'));
      if (res.ok) {
        const json = await res.json();
        const products = Array.isArray(json?.data) ? json.data : json;
        setImagingAccessoriesProducts(products || []);
      }
    } catch { }
  };

  // Portable X-Ray fetch functions
  const fetchPortableXRayHero = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/portable-xray/hero'));
      if (res.ok) {
        const json = await res.json();
        setPortableXRayHero(json?.data || json || null);
      }
    } catch { }
  };
  const fetchPortableXRayOverview = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/portable-xray/overview'));
      if (res.ok) {
        const json = await res.json();
        setPortableXRayOverview(json?.data || json || null);
      }
    } catch { }
  };
  const fetchPortableXRayFeatures = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/portable-xray/features'));
      if (res.ok) {
        const json = await res.json();
        const features = Array.isArray(json?.data) ? json.data : json;
        setPortableXRayFeatures(features.filter((f: any) => !f.isDeleted).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      }
    } catch { }
  };
  const fetchPortableXRaySpecifications = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/portable-xray/specifications'));
      if (res.ok) {
        const json = await res.json();
        const specifications = Array.isArray(json?.data) ? json.data : json;
        setPortableXRaySpecifications(specifications.filter((s: any) => !s.isDeleted).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      }
    } catch { }
  };
  const fetchPortableXRayProducts = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/portable-xray/products'));
      if (res.ok) {
        const json = await res.json();
        const products = Array.isArray(json?.data) ? json.data : json;
        setPortableXRayProducts(products.filter((p: any) => !p.isDeleted).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      }
    } catch { }
  };

  // Radiography fetch functions
  const fetchRadiographyHero = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/radiography/hero'));
      if (res.ok) {
        const json = await res.json();
        setRadiographyHero(json?.data || json || null);
      }
    } catch { }
  };
  const fetchRadiographyProducts = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/radiography/products'));
      if (res.ok) {
        const json = await res.json();
        const products = Array.isArray(json?.data) ? json.data : json;
        setRadiographyProducts(products.filter((p: any) => !p.isDeleted).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      }
    } catch { }
  };

  // Flat Panel fetch functions
  const fetchFlatPanelHero = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/flat-panel/hero'));
      if (res.ok) {
        const json = await res.json();
        setFlatPanelHero(json?.data || json || null);
      }
    } catch { }
  };
  const fetchFlatPanelProducts = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/flat-panel/products'));
      if (res.ok) {
        const json = await res.json();
        const products = Array.isArray(json?.data) ? json.data : json;
        setFlatPanelProducts(products.filter((p: any) => !p.isDeleted).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      }
    } catch { }
  };

  // Mammography fetch functions
  const fetchMammographyHero = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/mammography/hero'));
      if (res.ok) {
        const json = await res.json();
        setMammographyHero(json?.data || json || null);
      }
    } catch { }
  };
  const fetchMammographyProducts = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/mammography/products'));
      if (res.ok) {
        const json = await res.json();
        const products = Array.isArray(json?.data) ? json.data : json;
        setMammographyProducts(products.filter((p: any) => !p.isDeleted).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      }
    } catch { }
  };

  // Refurbished MRI fetch functions
  const fetchRefurbishedMRIHero = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/refurbished-mri/hero'));
      if (res.ok) {
        const json = await res.json();
        setRefurbishedMRIHero(json?.data || json || null);
      }
    } catch { }
  };
  const fetchRefurbishedMRIProducts = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/refurbished-mri/products'));
      if (res.ok) {
        const json = await res.json();
        const products = Array.isArray(json?.data) ? json.data : json;
        setRefurbishedMRIProducts(products.filter((p: any) => !p.isDeleted).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      }
    } catch { }
  };

  // Search Results fetch function
  const fetchSearchResults = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/search-results'));
      if (res.ok) {
        const json = await res.json();
        const results = Array.isArray(json?.data) ? json.data : json;
        setSearchResults(results.filter((r: any) => !r.isDeleted).sort((a: any, b: any) => {
          // Sort by page number first, then by display order
          if (a.pageNumber !== b.pageNumber) {
            return a.pageNumber - b.pageNumber;
          }
          return (a.displayOrder || 0) - (b.displayOrder || 0);
        }));
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // User Management fetch function
  const fetchUsers = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/users'), {
        headers: { ...authHeaders() as any }
      });
      if (res.ok) {
        const json = await res.json();
        const usersList = Array.isArray(json?.data) ? json.data : json;
        setUsers(usersList || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchImagingAccessoriesHero();
    fetchImagingAccessoriesProducts();
    fetchPortableXRayHero();
    fetchPortableXRayOverview();
    fetchPortableXRayFeatures();
    fetchPortableXRaySpecifications();
    fetchPortableXRayProducts();
    fetchRadiographyHero();
    fetchRadiographyProducts();
    fetchFlatPanelHero();
    fetchFlatPanelProducts();
    fetchMammographyHero();
    fetchMammographyProducts();
    fetchRefurbishedMRIHero();
    fetchRefurbishedMRIProducts();
    fetchSearchResults();
    fetchUsers();
  }, []);

  // API-backed Home Page data
  const [homeHero, setHomeHero] = useState<any>(null);
  const [homeAboutSection, setHomeAboutSection] = useState<any>(null);
  const [homeImageBoxes, setHomeImageBoxes] = useState<any[]>([]);
  const [homeCommitment, setHomeCommitment] = useState<any>(null);

  // Version control state
  const [versions, setVersions] = useState<any[]>([]);
  const [showVersions, setShowVersions] = useState(false);
  const [currentVersionSection, setCurrentVersionSection] = useState<string>('');
  const [deletedItems, setDeletedItems] = useState<any[]>([]);
  const [showDeletedItems, setShowDeletedItems] = useState(false);

  const fetchHomeHero = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/home-page/hero'));
      if (res.ok) {
        const json = await res.json();
        setHomeHero(json?.data || json || null);
      }
    } catch { }
  };
  const fetchHomeAboutSection = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/home-page/about-section'));
      if (res.ok) {
        const json = await res.json();
        setHomeAboutSection(json?.data || json || null);
      }
    } catch { }
  };
  const fetchHomeImageBoxes = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/home-page/image-boxes'));
      if (res.ok) {
        const json = await res.json();
        const boxes = Array.isArray(json?.data) ? json.data : json;
        setHomeImageBoxes((boxes || []).slice().sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      }
    } catch { }
  };
  const fetchHomeCommitment = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/home-page/commitment'));
      if (res.ok) {
        const json = await res.json();
        const commitment = json?.data || json || null;
        setHomeCommitment(commitment);
        // Parse cards from commitment
        if (commitment?.cards) {
          const cards = typeof commitment.cards === 'string'
            ? JSON.parse(commitment.cards)
            : commitment.cards;
          setCommitmentCards(Array.isArray(cards) ? cards : []);
        } else {
          setCommitmentCards([]);
        }
      }
    } catch { }
  };

  // Fetch versions for a section
  const fetchVersions = async (sectionType: string, sectionId?: number) => {
    try {
      const params = new URLSearchParams({ sectionType });
      if (sectionId) params.append('sectionId', sectionId.toString());
      const res = await fetch(getApiUrl(`/api/cms/home-page/versions?${params}`), {
        headers: { ...authHeaders() as any }
      });
      if (res.ok) {
        const json = await res.json();
        setVersions(Array.isArray(json?.data) ? json.data : []);
      }
    } catch (error) {
      console.error('Error fetching versions:', error);
    }
  };

  // Restore a version
  const handleRestoreVersion = async (version: any) => {
    if (!window.confirm(`Are you sure you want to restore version ${version.versionNumber}? This will overwrite the current content.`)) {
      return;
    }

    try {
      const res = await fetch(getApiUrl(`/api/cms/home-page/versions/${version.id}`), {
        headers: { ...authHeaders() as any }
      });
      if (res.ok) {
        const json = await res.json();
        const versionData = json.data?.data || json.data;

        // Update the specific section
        if (version.sectionType === 'home-hero') {
          await fetch(getApiUrl('/api/cms/home-page/hero'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify(versionData)
          });
          await fetchHomeHero();
          window.dispatchEvent(new CustomEvent('homeHeroChanged'));
        } else if (version.sectionType === 'home-about-section') {
          await fetch(getApiUrl('/api/cms/home-page/about-section'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify(versionData)
          });
          await fetchHomeAboutSection();
          window.dispatchEvent(new CustomEvent('homeAboutSectionChanged'));
        } else if (version.sectionType === 'home-commitment') {
          await fetch(getApiUrl('/api/cms/home-page/commitment'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify(versionData)
          });
          await fetchHomeCommitment();
          window.dispatchEvent(new CustomEvent('homeCommitmentChanged'));
        } else if (version.sectionType === 'home-image-box' && version.sectionId) {
          await fetch(getApiUrl(`/api/cms/home-page/image-boxes/${version.sectionId}`), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify(versionData)
          });
          await fetchHomeImageBoxes();
          window.dispatchEvent(new CustomEvent('homeImageBoxesChanged'));
        }

        showToast.success('Version restored successfully!');
        setShowVersions(false);
        await fetchVersions(version.sectionType, version.sectionId || undefined);
      }
    } catch (error) {
      console.error('Error restoring version:', error);
      showToast.error('Failed to restore version. Please try again.');
    }
  };

  // Fetch deleted items
  const fetchDeletedItems = async () => {
    try {
      // Fetch image boxes with deleted items
      const res = await fetch(getApiUrl('/api/cms/home-page/image-boxes?includeDeleted=true'), {
        headers: { ...authHeaders() as any }
      });
      if (res.ok) {
        const json = await res.json();
        const allBoxes = Array.isArray(json?.data) ? json.data : [];
        const deleted = allBoxes.filter((box: any) => box.isDeleted === true);
        setDeletedItems(deleted);
      }
    } catch (error) {
      console.error('Error fetching deleted items:', error);
    }
  };

  // Restore deleted item
  const handleRestoreDeletedItem = async (item: any, itemType: string) => {
    try {
      if (itemType === 'home-image-box' && item.id) {
        await fetch(getApiUrl(`/api/cms/home-page/image-boxes/${item.id}/restore`), {
          method: 'POST',
          headers: { ...authHeaders() as any }
        });
        await fetchHomeImageBoxes();
        await fetchDeletedItems();
        showToast.success('Item restored successfully!');
      }
    } catch (error) {
      console.error('Error restoring item:', error);
      showToast.error('Failed to restore item. Please try again.');
    }
  };

  useEffect(() => {
    fetchHomeHero();
    fetchHomeAboutSection();
    fetchHomeImageBoxes();
    fetchHomeCommitment();
    fetchDeletedItems();
  }, []);


  // API-backed statistics for admin view
  const [statisticsApi, setStatisticsApi] = useState<any[]>([]);
  const fetchStatistics = async () => {
    try {
      console.log('🔄 Admin: Fetching statistics from API...');
      const res = await fetch(getApiUrl('/api/cms/home/statistics'));
      if (res.ok) {
        const json = await res.json();
        const rows = Array.isArray(json?.data) ? json.data : json;
        setStatisticsApi((rows || []).slice().sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
        console.log('✅ Admin: Statistics loaded from API:', rows?.length || 0, rows);
      } else {
        console.error('❌ Admin: Statistics API failed:', res.status, res.statusText);
      }
    } catch (error) {
      console.error('❌ Admin: Statistics API error:', error);
    }
  };
  useEffect(() => { fetchStatistics(); }, []);

  // API-backed about data for admin view
  // About Page CMS State
  const [aboutHero, setAboutHero] = useState<any>(null);
  const [aboutRedefiningHealthcare, setAboutRedefiningHealthcare] = useState<any>(null);
  const [aboutRefexGroup, setAboutRefexGroup] = useState<any>(null);

  // Mission-Vision CMS Data
  const [missionVisionHero, setMissionVisionHero] = useState<any>(null);
  const [missionVisionMission, setMissionVisionMission] = useState<any>(null);
  const [missionVisionVision, setMissionVisionVision] = useState<any>(null);

  // Why Choose Us CMS Data
  const [whyChooseUsHero, setWhyChooseUsHero] = useState<any>(null);
  const [whyChooseUsOfferings, setWhyChooseUsOfferings] = useState<any>(null);
  const [whyChooseUsAdvantages, setWhyChooseUsAdvantages] = useState<any>(null);

  // Contact CMS Data
  const [contactHero, setContactHero] = useState<any>(null);
  const [contactInfoCards, setContactInfoCards] = useState<any[]>([]);
  const [contactMap, setContactMap] = useState<any>(null);
  const [contactForm, setContactForm] = useState<any>(null);

  const [aboutApi, setAboutApi] = useState<any>({ hero: null, visionMission: null, sections: [], leadership: [], values: [], journey: [], aboutJourney: null });

  // Local state for about vision mission editing
  const [aboutVisionMissionLocal, setAboutVisionMissionLocal] = useState<any>(null);

  // Mission points modal state
  const [aboutMpModalOpen, setAboutMpModalOpen] = useState(false);
  const [aboutMpMode, setAboutMpMode] = useState<'add' | 'edit'>('add');
  const [aboutMpEditingId, setAboutMpEditingId] = useState<string | undefined>();
  const [aboutMpForm, setAboutMpForm] = useState<any>({
    title: '',
    description: '',
    order: 1,
    isActive: true
  });
  const fetchAboutHero = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/about-page/hero'));
      if (res.ok) {
        const json = await res.json();
        setAboutHero(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching about hero:', error);
    }
  };

  const fetchAboutRedefiningHealthcare = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/about-page/redefining-healthcare'));
      if (res.ok) {
        const json = await res.json();
        setAboutRedefiningHealthcare(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching redefining healthcare:', error);
    }
  };

  const fetchAboutRefexGroup = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/about-page/refex-group'));
      if (res.ok) {
        const json = await res.json();
        setAboutRefexGroup(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching refex group:', error);
    }
  };

  // Mission-Vision CMS Fetch Functions
  const fetchMissionVisionHero = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/mission-vision/hero'));
      if (res.ok) {
        const json = await res.json();
        setMissionVisionHero(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching mission vision hero:', error);
    }
  };

  const fetchMissionVisionMission = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/mission-vision/content/mission'));
      if (res.ok) {
        const json = await res.json();
        setMissionVisionMission(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching mission:', error);
    }
  };

  const fetchMissionVisionVision = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/mission-vision/content/vision'));
      if (res.ok) {
        const json = await res.json();
        setMissionVisionVision(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching vision:', error);
    }
  };

  const fetchMissionVisionData = async () => {
    await Promise.all([
      fetchMissionVisionHero(),
      fetchMissionVisionMission(),
      fetchMissionVisionVision()
    ]);
  };

  // Why Choose Us CMS Fetch Functions
  const fetchWhyChooseUsHero = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/why-choose-us-page/hero'));
      if (res.ok) {
        const json = await res.json();
        setWhyChooseUsHero(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching why choose us hero:', error);
    }
  };

  const fetchWhyChooseUsOfferings = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/why-choose-us-page/offerings'));
      if (res.ok) {
        const json = await res.json();
        setWhyChooseUsOfferings(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching why choose us offerings:', error);
    }
  };

  const fetchWhyChooseUsAdvantages = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/why-choose-us-page/advantages'));
      if (res.ok) {
        const json = await res.json();
        setWhyChooseUsAdvantages(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching why choose us advantages:', error);
    }
  };

  const fetchWhyChooseUsData = async () => {
    await Promise.all([
      fetchWhyChooseUsHero(),
      fetchWhyChooseUsOfferings(),
      fetchWhyChooseUsAdvantages()
    ]);
  };

  // Contact CMS Fetch Functions
  const fetchContactHero = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/contact-page/hero'));
      if (res.ok) {
        const json = await res.json();
        setContactHero(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching contact hero:', error);
    }
  };

  const fetchContactInfoCards = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/contact-page/info-cards'));
      if (res.ok) {
        const json = await res.json();
        const cards = Array.isArray(json?.data) ? json.data : json;
        setContactInfoCards(cards.filter((c: any) => c.isActive !== false).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      }
    } catch (error) {
      console.error('Error fetching contact info cards:', error);
    }
  };

  const fetchContactMap = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/contact-page/map'));
      if (res.ok) {
        const json = await res.json();
        setContactMap(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching contact map:', error);
    }
  };

  const fetchContactForm = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/contact-page/form'));
      if (res.ok) {
        const json = await res.json();
        setContactForm(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching contact form:', error);
    }
  };

  const fetchContactData = async () => {
    await Promise.all([
      fetchContactHero(),
      fetchContactInfoCards(),
      fetchContactMap(),
      fetchContactForm()
    ]);
  };

  const fetchAboutData = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/about'));
      if (res.ok) {
        const json = await res.json();
        console.log('🔍 About API Response:', json);
        setAboutApi(json.data || json);
      } else {
        console.log('❌ About API Error:', res.status, res.statusText);
      }
    } catch (error) {
      console.log('❌ About API Fetch Error:', error);
    }
  };
  useEffect(() => {
    fetchAboutData();
    fetchAboutHero();
    fetchAboutRedefiningHealthcare();
    fetchAboutRefexGroup();
    fetchMissionVisionData();
    fetchWhyChooseUsData();
    fetchContactData();
  }, []);

  // Products Hero CMS
  const fetchProductsHero = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/products/hero'));
      if (res.ok) {
        const json = await res.json();
        setProductsHero(json.data);
      }
    } catch { }
  };
  useEffect(() => { fetchProductsHero(); }, []);

  // Image upload helper
  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(getApiUrl('/api/upload/image'), {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const json = await res.json();
        return json.imageUrl;
      }
      return null;
    } catch (e) {
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  // Wrapper function for components that expect uploadImage with token
  const uploadImageWrapper = async (file: File): Promise<string | null> => {
    return uploadImage(file);
  };

  // Wrapper function for components that expect authHeaders with token
  const getAuthHeaders = () => {
    return authHeaders();
  };

  const uploadDocument = async (file: File): Promise<string | null> => {
    if (!file) return null;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('document', file);
      const res = await fetch(getApiUrl('/api/upload/document'), {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const json = await res.json();
        return json.documentUrl || json.imageUrl;
      } else {
        const errorText = await res.text();
        console.error('Document upload error:', errorText);
        showToast.error('Failed to upload document. Please make sure it is a PDF file.');
      }
      return null;
    } catch (e) {
      console.error('Document upload error:', e);
      showToast.error('Failed to upload document. Please try again.');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const saveProductsHero = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/products/hero'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productsHero || {}),
      });
      if (!res.ok) throw new Error('Failed to save');
      await fetchProductsHero();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('productsHeroChanged'));
      }
      showToast.success('Product Hero saved');
    } catch (e) {
      showToast.error('Failed to save Product Hero');
    }
  };

  // Initialize local state when API data loads
  useEffect(() => {
    if (aboutApi.visionMission) {
      setAboutVisionMissionLocal(aboutApi.visionMission);
    }
  }, [aboutApi.visionMission]);

  // Save about vision mission to API
  const saveAboutVisionMission = async (data: any) => {
    try {
      const response = await fetch(getApiUrl('/api/cms/about/vision-mission'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showToast.success('About Vision & Mission saved successfully!');
        // Refresh the API data
        await fetchAboutData();
        // Notify about page to refresh
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('aboutDataChanged'));
        }
        return true;
      } else {
        const errorData = await response.text();
        console.error('Save failed:', errorData);
        showToast.error('Failed to save About Vision & Mission');
        return false;
      }
    } catch (error) {
      console.error('Error saving About Vision & Mission:', error);
      showToast.error('Error saving About Vision & Mission');
      return false;
    }
  };

  // Mission points management functions
  const openAboutMpModal = (mode: 'add' | 'edit', point?: any) => {
    setAboutMpMode(mode);
    if (mode === 'edit' && point) {
      setAboutMpEditingId(point.id);
      setAboutMpForm({
        title: point.title || '',
        description: point.description || '',
        order: point.order || 1,
        isActive: point.isActive !== false
      });
    } else {
      setAboutMpEditingId(undefined);
      setAboutMpForm({
        title: '',
        description: '',
        order: (aboutVisionMissionLocal?.missionPoints || []).length + 1,
        isActive: true
      });
    }
    setAboutMpModalOpen(true);
  };

  const closeAboutMpModal = () => {
    setAboutMpModalOpen(false);
    setAboutMpForm({ title: '', description: '', order: 1, isActive: true });
  };

  const saveAboutMpModal = () => {
    if (!aboutVisionMissionLocal) return;

    const existing = aboutVisionMissionLocal.missionPoints || [];
    if (aboutMpMode === 'add') {
      const newPoint = {
        id: `mp-${Date.now()}`,
        title: aboutMpForm.title,
        description: aboutMpForm.description,
        order: Number(aboutMpForm.order) || 0,
        isActive: !!aboutMpForm.isActive
      };
      const updated = [...existing, newPoint];
      setAboutVisionMissionLocal({ ...aboutVisionMissionLocal, missionPoints: updated });
    } else if (aboutMpMode === 'edit' && aboutMpEditingId) {
      const updated = existing.map((p: any) =>
        p.id === aboutMpEditingId
          ? { ...p, title: aboutMpForm.title, description: aboutMpForm.description, order: Number(aboutMpForm.order) || 0, isActive: !!aboutMpForm.isActive }
          : p
      );
      setAboutVisionMissionLocal({ ...aboutVisionMissionLocal, missionPoints: updated });
    }
    closeAboutMpModal();
  };

  const deleteAboutMissionPoint = (id: string) => {
    if (!aboutVisionMissionLocal) return;
    const updated = (aboutVisionMissionLocal.missionPoints || []).filter((p: any) => p.id !== id);
    setAboutVisionMissionLocal({ ...aboutVisionMissionLocal, missionPoints: updated });
  };

  // API-backed regulatory approvals for admin view
  const [regulatoryApi, setRegulatoryApi] = useState<any[]>([]);
  const fetchRegulatory = async () => {
    try {
      const res = await fetch(getApiUrl('/api/cms/home/regulatory'));
      if (res.ok) {
        const json = await res.json();
        const rows = Array.isArray(json?.data) ? json.data : json;
        setRegulatoryApi((rows || []).slice().sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      }
    } catch { }
  };
  useEffect(() => { fetchRegulatory(); }, []);

  const getAuthToken = () => {
    // First try Zustand store (preferred)
    if (token) return token;
    // Fallback to localStorage keys
    return localStorage.getItem('auth_token') || localStorage.getItem('token') || '';
  };
  const authHeaders = (): Record<string, string> => {
    const t = getAuthToken();
    if (!t) {
      console.warn('⚠️ No auth token found');
      return {};
    }
    return { 'Authorization': `Bearer ${t}` };
  };

  // Map brand color keys to hex (fallback to given value if already hex)
  const getColorValue = (color: string) => {
    const colorMap = {
      'refex-blue': '#2879b6',
      'refex-green': '#7dc244',
      'refex-orange': '#ee6a31'
    } as const;
    return (colorMap as any)[color] || color || '#2879b6';
  };

  const handleLogout = async () => {
    try {
      // Call logout API endpoint
      const token = useAdminAuthStore.getState().token;
      if (token) {
        try {
          await fetch(getApiUrl('/api/auth/logout'), {
        method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
        } catch (err) {
          // Continue with logout even if API call fails
          console.warn('Logout API call failed:', err);
        }
      }

      // Clear AdminContext
      logout();

      // Clear Zustand store
      useAdminAuthStore.getState().logout();

      // Clear all localStorage items related to admin
      localStorage.removeItem('admin_user');
      localStorage.removeItem('admin_data');
      localStorage.removeItem('3i-admin-auth');

      // Navigate to login page
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even on error
      logout();
      useAdminAuthStore.getState().logout();
      localStorage.clear();
      window.location.href = '/admin/login';
    }
  };

  const handleAdd = () => {
    setModalType('add');
    setEditingItem(null);
    setFormData({
      achievements: [] // Initialize achievements as empty array
    });
    setShowModal(true);
  };

  const handleEdit = (item: any) => {
    setModalType('edit');

    // Handle Home Page Image Boxes separately
    if (activeTab === 'home-page' && activeHomeSection === 'image-boxes') {
      setEditingItem({ type: 'home-image-box', id: item.id });
      setFormData({
        label: item.label || '',
        title: item.title || '',
        description: item.description || '',
        image: item.image || '',
        link: item.link || '',
        linkText: item.linkText || '',
        order: item.order || 0,
        isActive: item.isActive !== false
      });
      setShowModal(true);
      return;
    }

    // Handle Home Page Commitment Cards separately
    if (activeTab === 'home-page' && activeHomeSection === 'commitment') {
      setEditingItem({ type: 'home-commitment-card', cardIndex: item.index });
      setFormData({
        title: item.title || '',
        icon: item.icon || '',
        description: item.description || '',
        link: item.link || '',
        linkText: item.linkText || 'Learn More',
        order: item.order || 0,
        isActive: item.isActive !== false
      });
      setShowModal(true);
      return;
    }

    // Handle Portable X-Ray Products separately
    if (activeTab === 'portable-xray-page' && activePortableXRaySection === 'products') {
      setEditingItem({ type: 'portable-xray-product', id: item.id });
      // Convert features from JSON array to text (one per line)
      let featuresText = '';
      if (item.features) {
        try {
          const featuresArray = typeof item.features === 'string'
            ? JSON.parse(item.features)
            : item.features;
          if (Array.isArray(featuresArray)) {
            featuresText = featuresArray.join('\n');
          } else if (typeof featuresArray === 'string') {
            featuresText = featuresArray;
          }
        } catch {
          featuresText = item.features;
        }
      }
      setFormData({
        title: item.title || '',
        overview: item.overview || '',
        features: featuresText,
        benefits: item.benefits || '',
        image: item.image || '',
        sectionId: item.sectionId || '',
        imagePosition: item.imagePosition || 'left',
        backgroundColor: item.backgroundColor || 'from-gray-50 to-white',
        order: item.order || 0,
        isActive: item.isActive ?? true
      });
      setShowModal(true);
      return;
    }

    // Handle Radiography Products separately
    if (activeTab === 'radiography-page' && activeRadiographySection === 'products') {
      setEditingItem({ type: 'radiography-product', id: item.id });
      let featuresText = '';
      if (item.features) {
        try {
          const featuresArray = typeof item.features === 'string' ? JSON.parse(item.features) : item.features;
          if (Array.isArray(featuresArray)) {
            featuresText = featuresArray.join('\n');
          } else if (typeof featuresArray === 'string') {
            featuresText = featuresArray;
          }
        } catch {
          featuresText = item.features;
        }
      }
      setFormData({
        title: item.title || '',
        overview: item.overview || '',
        features: featuresText,
        benefits: item.benefits || '',
        image: item.image || '',
        sectionId: item.sectionId || '',
        imagePosition: item.imagePosition || 'left',
        backgroundColor: item.backgroundColor || 'from-gray-50 to-white',
        order: item.order || 0,
        isActive: item.isActive ?? true
      });
      setShowModal(true);
      return;
    }

    // Handle Flat Panel Products separately
    if (activeTab === 'flat-panel-page' && activeFlatPanelSection === 'products') {
      setEditingItem({ type: 'flat-panel-product', id: item.id });
      let featuresText = '';
      if (item.features) {
        try {
          const featuresArray = typeof item.features === 'string' ? JSON.parse(item.features) : item.features;
          if (Array.isArray(featuresArray)) {
            featuresText = featuresArray.join('\n');
          } else if (typeof featuresArray === 'string') {
            featuresText = featuresArray;
          }
        } catch {
          featuresText = item.features;
        }
      }
      setFormData({
        title: item.title || '',
        overview: item.overview || '',
        features: featuresText,
        benefits: item.benefits || '',
        image: item.image || '',
        sectionId: item.sectionId || '',
        imagePosition: item.imagePosition || 'left',
        backgroundColor: item.backgroundColor || 'from-gray-50 to-white',
        order: item.order || 0,
        isActive: item.isActive ?? true
      });
      setShowModal(true);
      return;
    }

    // Handle Mammography Products separately
    if (activeTab === 'mammography-page' && activeMammographySection === 'products') {
      setEditingItem({ type: 'mammography-product', id: item.id });
      let featuresText = '';
      if (item.features) {
        try {
          const featuresArray = typeof item.features === 'string' ? JSON.parse(item.features) : item.features;
          if (Array.isArray(featuresArray)) {
            featuresText = featuresArray.join('\n');
          } else if (typeof featuresArray === 'string') {
            featuresText = featuresArray;
          }
        } catch {
          featuresText = item.features;
        }
      }
      setFormData({
        title: item.title || '',
        overview: item.overview || '',
        features: featuresText,
        benefits: item.benefits || '',
        image: item.image || '',
        sectionId: item.sectionId || '',
        imagePosition: item.imagePosition || 'left',
        backgroundColor: item.backgroundColor || 'from-gray-50 to-white',
        order: item.order || 0,
        isActive: item.isActive ?? true
      });
      setShowModal(true);
      return;
    }

    // Handle Refurbished MRI Products separately
    if (activeTab === 'mri-page' && activeRefurbishedMRISection === 'products') {
      setEditingItem({ type: 'refurbished-mri-product', id: item.id });
      let featuresText = '';
      if (item.features) {
        try {
          const featuresArray = typeof item.features === 'string' ? JSON.parse(item.features) : item.features;
          if (Array.isArray(featuresArray)) {
            featuresText = featuresArray.join('\n');
          } else if (typeof featuresArray === 'string') {
            featuresText = featuresArray;
          }
        } catch {
          featuresText = item.features;
        }
      }
      setFormData({
        title: item.title || '',
        overview: item.overview || '',
        features: featuresText,
        benefits: item.benefits || '',
        image: item.image || '',
        sectionId: item.sectionId || '',
        imagePosition: item.imagePosition || 'left',
        backgroundColor: item.backgroundColor || 'from-gray-50 to-white',
        order: item.order || 0,
        isActive: item.isActive ?? true
      });
      setShowModal(true);
      return;
    }


    setEditingItem(item);
    // Ensure achievements is always an array
    const formData = {
      ...item,
      achievements: Array.isArray(item.achievements) ? item.achievements : (item.achievements ? [item.achievements] : [])
    };
    setFormData(formData);
    setShowModal(true);
  };

  const handleDelete = (item: any) => {
    if (window.confirm('Are you sure you want to delete this item? (This is a soft delete and can be restored)')) {
      // Handle Home Page Image Boxes soft delete
      if (activeTab === 'home-page' && activeHomeSection === 'image-boxes' && item?.id) {
        (async () => {
          try {
            await fetch(getApiUrl(`/api/cms/home-page/image-boxes/${item.id}`), {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any }
            });
            await fetchHomeImageBoxes();
            showToast.success('Image box deleted successfully. You can restore it from the Deleted Items section.');
          } catch (error) {
            console.error('Error deleting image box:', error);
            showToast.error('Failed to delete image box. Please try again.');
          }
        })();
        return;
      }

      let sectionKey: keyof AdminData;

      if (activeTab === 'home-page') {
        const sectionMap: { [key: string]: keyof AdminData } = {
          'hero-slides': 'heroSlides',
          'statistics': 'statistics',
          'regulatory': 'regulatoryApprovals'
        };
        sectionKey = sectionMap[activeHomeSection] as keyof AdminData;
        if (sectionKey === 'heroSlides' && item?.id) {
          (async () => {
            try {
              await fetch(getApiUrl(`/api/cms/home/slides/${item.id}`), { method: 'DELETE', headers: { 'Content-Type': 'application/json', ...authHeaders() as any } });
              // Refresh handled by HomePage_cms component
            } catch { }
          })();
          return;
        }
        if (sectionKey === 'statistics' && item?.id) {
          (async () => {
            try {
              await fetch(getApiUrl(`/api/cms/home/statistics/${item.id}`), { method: 'DELETE', headers: { 'Content-Type': 'application/json', ...authHeaders() as any } });
              await fetchStatistics();
            } catch { }
          })();
          return;
        }
        if (sectionKey === 'regulatoryApprovals' && item?.id) {
          (async () => {
            try {
              await fetch(getApiUrl(`/api/cms/home/regulatory/${item.id}`), { method: 'DELETE', headers: { 'Content-Type': 'application/json', ...authHeaders() as any } });
              await fetchRegulatory();
            } catch { }
          })();
          return;
        }
      } else if (activeTab === 'about-page') {
        const sectionMap: { [key: string]: keyof AdminData } = {
          'about-hero': 'aboutHero',
          'about-journey-image': 'aboutJourneyImage',
          'vision-mission': 'visionMission',
          'about-sections': 'aboutSections',
          'values': 'values',
          'journey': 'journey'
        };
        sectionKey = sectionMap[activeAboutSection] as keyof AdminData;
        if (sectionKey === 'visionMission' || sectionKey === 'aboutJourneyImage') {
          // single object; nothing to delete
          return;
        }

      } else if (activeTab === 'portable-xray-page') {
        if (activePortableXRaySection === 'products' && item?.id) {
          (async () => {
            try {
              const response = await fetch(getApiUrl(`/api/cms/portable-xray/products/${item.id}`), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any }
              });
              if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to delete product');
              }
              await fetchPortableXRayProducts();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('portableXRayProductsChanged'));
              }
              showToast.success('Product deleted successfully!');
            } catch (error: any) {
              console.error('Error deleting product:', error);
              showToast.error(`Failed to delete product: ${error.message || 'Please try again.'}`);
            }
          })();
          return;
        }
        return;
      } else if (activeTab === 'radiography-page') {
        if (activeRadiographySection === 'products' && item?.id) {
          (async () => {
            try {
              await fetch(getApiUrl(`/api/cms/radiography/products/${item.id}`), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any }
              });
              await fetchRadiographyProducts();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('radiographyProductsChanged'));
              }
            } catch { }
          })();
          return;
        }
        return;
      } else if (activeTab === 'flat-panel-page') {
        if (activeFlatPanelSection === 'products' && item?.id) {
          (async () => {
            try {
              await fetch(getApiUrl(`/api/cms/flat-panel/products/${item.id}`), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any }
              });
              await fetchFlatPanelProducts();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('flatPanelProductsChanged'));
              }
            } catch { }
          })();
          return;
        }
        return;
      } else if (activeTab === 'mammography-page') {
        if (activeMammographySection === 'products' && item?.id) {
          (async () => {
            try {
              await fetch(getApiUrl(`/api/cms/mammography/products/${item.id}`), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any }
              });
              await fetchMammographyProducts();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('mammographyProductsChanged'));
              }
            } catch { }
          })();
          return;
        }
        return;
      } else if (activeTab === 'mri-page') {
        if (activeRefurbishedMRISection === 'products' && item?.id) {
          (async () => {
            try {
              await fetch(getApiUrl(`/api/cms/refurbished-mri/products/${item.id}`), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any }
              });
              await fetchRefurbishedMRIProducts();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('refurbishedMRIProductsChanged'));
              }
            } catch { }
          })();
          return;
        }
        return;
      } else if (activeTab === 'portable-xray-page') {
        if (activePortableXRaySection === 'features' && item?.id) {
          (async () => {
            try {
              await fetch(getApiUrl(`/api/cms/portable-xray/features/${item.id}`), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any }
              });
              await fetchPortableXRayFeatures();
            } catch { }
          })();
          return;
        }
        if (activePortableXRaySection === 'specifications' && item?.id) {
          (async () => {
            try {
              await fetch(getApiUrl(`/api/cms/portable-xray/specifications/${item.id}`), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any }
              });
              await fetchPortableXRaySpecifications();
            } catch { }
          })();
          return;
        }
        return;
      } else if (activeTab === 'search-results-page') {
        if (item?.id) {
          (async () => {
            try {
              await fetch(getApiUrl(`/api/cms/search-results/${item.id}`), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any }
              });
              await fetchSearchResults();
            } catch (error) {
              console.error('Error deleting search result:', error);
            }
          })();
          return;
        }
        return;
      } else if (activeTab === 'user-management') {
        if (item?.id) {
          (async () => {
            try {
              await fetch(getApiUrl(`/api/cms/users/${item.id}`), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any }
              });
              await fetchUsers();
              showToast.success('User deleted successfully!');
            } catch (error: any) {
              console.error('Error deleting user:', error);
              showToast.error(`Failed to delete user: ${error.message || 'Please try again.'}`);
            }
          })();
          return;
        }
        return;
      } else {
        return;
      }

      if (sectionKey) {
        deleteItem(sectionKey, item.id);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🔵 handleSubmit called', { 
      editingItem, 
      activeTab, 
      activePortableXRaySection,
      modalType,
      formData: { ...formData, image: formData.image ? 'has image' : 'no image' }
    });
    let sectionKey: keyof AdminData | null = null; // Will be set based on activeTab

    // Handle Email Settings FIRST (before other checks) - it's in contact-page tab
    if (editingItem === 'email-settings') {
      console.log('📧 Email settings handler triggered');
      // Use async IIFE to properly handle the async operation
      (async () => {
        try {
          const payload: any = {
            smtpHost: formData.smtpHost || '',
            smtpPort: formData.smtpPort || 587,
            smtpSecure: formData.smtpSecure !== undefined ? formData.smtpSecure : false,
            smtpUser: formData.smtpUser || '',
            fromEmail: formData.fromEmail || '',
            fromName: formData.fromName || '3i MedTech',
            toEmail: formData.toEmail || '',
            isActive: formData.isActive ?? true,
          };

          // Only include password if it's not masked and not empty
          if (formData.smtpPassword && formData.smtpPassword !== '***' && formData.smtpPassword.trim() !== '') {
            payload.smtpPassword = formData.smtpPassword;
          }

          console.log('📧 Saving email settings via API', {
            url: getApiUrl('/api/cms/email-settings'),
            payload: { ...payload, smtpPassword: payload.smtpPassword ? '***' : undefined },
          });

          const response = await fetch(getApiUrl('/api/cms/email-settings'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify(payload),
          });

          let result: any = {};
          try {
            result = await response.json();
          } catch (e) {
            console.error('Failed to parse response JSON:', e);
          }

          console.log('📧 Email settings response', { status: response.status, ok: response.ok, result });

          if (response.ok) {
            showToast.success('Email settings saved successfully!');
            // Refresh email settings in ContactPage_cms if it's active
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('emailSettingsChanged'));
            }
            // Close modal and reset after successful save
            setShowModal(false);
            setFormData({});
            setEditingItem(null);
          } else {
            const errorMsg = result?.message || result?.error || 'Failed to save email settings';
            console.error('❌ Email settings save failed:', errorMsg, result);
            showToast.error(errorMsg);
          }
        } catch (error: any) {
          console.error('❌ Error saving email settings:', error);
          showToast.error(error?.message || 'Error saving email settings');
        }
      })();
      return;
    }

    if (activeTab === 'home-page') {
      // Handle new Home Page sections
      if (editingItem === 'home-hero') {
        try {
          const payload = {
            title: formData.title || '',
            backgroundImage: formData.backgroundImage || '',
            badgeImage: formData.badgeImage || '',
            badgeLink: formData.badgeLink || '',
            badgeAltText: formData.badgeAltText || '',
            isActive: !!formData.isActive
          };

          console.log('🚀 Updating hero:', payload);
          console.log('🔑 Auth headers:', authHeaders());

          const response = await fetch(getApiUrl('/api/cms/home-page/hero'), {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              ...authHeaders() as any
            },
            body: JSON.stringify(payload)
          });

          console.log('📡 Response status:', response.status, response.statusText);

          if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Error response:', errorText);
            let errorData;
            try {
              errorData = JSON.parse(errorText);
            } catch {
              errorData = { message: errorText || `HTTP error! status: ${response.status}` };
            }
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
          }

          // Wait for the data to be updated
          await fetchHomeHero();

          // Notify home page to refresh
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('homeHeroChanged'));
          }

          showToast.success('Hero section updated successfully!');

          // Only close modal after successful update
          setShowModal(false);
          setFormData({});
          setEditingItem(null);
        } catch (error: any) {
          console.error('Error updating hero:', error);
          showToast.error(`Failed to update hero section: ${error.message || 'Please try again.'}`);
          // Don't close modal on error
        }
        return;
      }
      if (editingItem === 'home-about-section') {
        try {
          const response = await fetch(getApiUrl('/api/cms/home-page/about-section'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify({
              label: formData.label || '',
              title: formData.title || '',
              description: formData.description || '',
              backgroundColor: formData.backgroundColor || '#1E4C84',
              isActive: !!formData.isActive
            })
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
          }

          await fetchHomeAboutSection();

          // Notify home page to refresh
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('homeAboutSectionChanged'));
          }

          showToast.success('About section updated successfully!');

          setShowModal(false);
          setFormData({});
          setEditingItem(null);
        } catch (error: any) {
          console.error('Error updating about section:', error);
          showToast.error(`Failed to update about section: ${error.message || 'Please try again.'}`);
        }
        return;
      }
      if (editingItem === 'home-image-box' || (typeof editingItem === 'object' && editingItem?.type === 'home-image-box')) {
        try {
          const payload = {
            label: formData.label || '',
            title: formData.title || '',
            description: formData.description || '',
            image: formData.image || '',
            link: formData.link || '',
            linkText: formData.linkText || 'Discover Now',
            order: Number(formData.order) || 0,
            isActive: !!formData.isActive
          };
          const editItem = typeof editingItem === 'object' && editingItem?.type === 'home-image-box' ? editingItem : null;

          let response;
          if (modalType === 'add') {
            response = await fetch(getApiUrl('/api/cms/home-page/image-boxes'), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify(payload)
            });
          } else if (editItem?.id) {
            response = await fetch(getApiUrl(`/api/cms/home-page/image-boxes/${editItem.id}`), {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify(payload)
            });
          } else {
            throw new Error('Invalid edit item: missing ID');
          }

          if (!response || !response.ok) {
            const errorData = await response?.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response?.status}`);
          }

          await fetchHomeImageBoxes();

          // Notify home page to refresh
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('homeImageBoxesChanged'));
          }

          showToast.success(modalType === 'add' ? 'Image box created successfully!' : 'Image box updated successfully!');

          setShowModal(false);
          setFormData({});
          setEditingItem(null);
        } catch (error: any) {
          console.error('Error updating image box:', error);
          showToast.error(`Failed to ${modalType === 'add' ? 'create' : 'update'} image box: ${error.message || 'Please try again.'}`);
        }
        return;
      }
      // Handle Commitment Section (section-level fields only)
      if (editingItem === 'home-commitment-section') {
        try {
          const response = await fetch(getApiUrl('/api/cms/home-page/commitment'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify({
              label: formData.label || '',
              title: formData.title || '',
              backgroundColor: formData.backgroundColor || '#F9FAFB',
              cards: homeCommitment?.cards || JSON.stringify([]), // Keep existing cards
              footerText: formData.footerText || '',
              footerLink: formData.footerLink || '',
              footerLinkText: formData.footerLinkText || '',
              isActive: !!formData.isActive
            })
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
          }

          await fetchHomeCommitment();

          // Notify home page to refresh
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('homeCommitmentChanged'));
          }

          showToast.success('Commitment section updated successfully!');

          setShowModal(false);
          setFormData({});
          setEditingItem(null);
        } catch (error: any) {
          console.error('Error updating commitment:', error);
          showToast.error(`Failed to update commitment section: ${error.message || 'Please try again.'}`);
        }
        return;
      }

      // Handle Commitment Cards (individual card add/edit)
      if (editingItem === 'home-commitment-card' || (typeof editingItem === 'object' && editingItem?.type === 'home-commitment-card')) {
        try {
          const editItem = typeof editingItem === 'object' && editingItem?.type === 'home-commitment-card' ? editingItem : null;
          const cardIndex = editItem?.cardIndex;

          let updatedCards = [...commitmentCards];

          const cardData = {
            title: formData.title || '',
            icon: formData.icon || '',
            description: formData.description || '',
            link: formData.link || '',
            linkText: formData.linkText || 'Learn More',
            order: Number(formData.order) || 0,
            isActive: !!formData.isActive
          };

          if (modalType === 'add') {
            updatedCards.push(cardData);
          } else if (cardIndex !== undefined) {
            updatedCards[cardIndex] = { ...updatedCards[cardIndex], ...cardData };
          }

          const response = await fetch(getApiUrl('/api/cms/home-page/commitment'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify({
              ...homeCommitment,
              cards: JSON.stringify(updatedCards)
            })
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
          }

          await fetchHomeCommitment();

          // Notify home page to refresh
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('homeCommitmentChanged'));
          }

          showToast.success(modalType === 'add' ? 'Card added successfully!' : 'Card updated successfully!');

          setShowModal(false);
          setFormData({});
          setEditingItem(null);
        } catch (error: any) {
          console.error('Error updating commitment card:', error);
          showToast.error(`Failed to ${modalType === 'add' ? 'add' : 'update'} card: ${error.message || 'Please try again.'}`);
        }
        return;
      }

      // Legacy sections (keeping for backward compatibility, but not used in actual page)
      const sectionMap: { [key: string]: keyof AdminData } = {
        'hero-slides': 'heroSlides',
        'statistics': 'statistics',
        'regulatory': 'regulatoryApprovals'
      };
      sectionKey = sectionMap[activeHomeSection] as keyof AdminData;
      if (sectionKey === 'heroSlides') {
        // Create or update via API
        (async () => {
          try {
            if (modalType === 'add') {
              await fetch(getApiUrl('/api/cms/home/slides'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify({
                  title: formData.title || '',
                  image: formData.image || '',
                  order: Number(formData.order) || 0,
                  isActive: !!formData.isActive
                })
              });
            } else if ((editingItem as any)?.id) {
              await fetch(getApiUrl(`/api/cms/home/slides/${(editingItem as any).id}`), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify({
                  title: formData.title || '',
                  image: formData.image || '',
                  order: Number(formData.order) || 0,
                  isActive: !!formData.isActive
                })
              });
            }
            // Refresh handled by HomePage_cms component
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('heroSlidesChanged'));
            }
          } catch { }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }
      if (sectionKey === 'statistics') {
        // Statistics create/update via API
        (async () => {
          try {
            const payload = {
              title: formData.title || '',
              value: formData.value || '',
              description: formData.description || '',
              image: formData.image || '',
              color: formData.color || '#2879b6',
              order: Number(formData.order) || 0,
              isActive: !!formData.isActive,
            };
            if (modalType === 'add') {
              await fetch(getApiUrl('/api/cms/home/statistics'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify(payload)
              });
            } else if ((editingItem as any)?.id) {
              await fetch(getApiUrl(`/api/cms/home/statistics/${(editingItem as any).id}`), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify(payload)
              });
            }
            await fetchStatistics();
          } catch { }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }
      if (sectionKey === 'regulatoryApprovals') {
        // Regulatory Approvals create/update via API
        (async () => {
          try {
            const payload = {
              title: formData.title || '',
              description: formData.description || '',
              image: formData.image || '',
              link: formData.link || '',
              color: formData.color || '#2879b6',
              order: Number(formData.order) || 0,
              isActive: !!formData.isActive,
            };
            if (modalType === 'add') {
              await fetch(getApiUrl('/api/cms/home/regulatory'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify(payload)
              });
            } else if ((editingItem as any)?.id) {
              await fetch(getApiUrl(`/api/cms/home/regulatory/${(editingItem as any).id}`), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify(payload)
              });
            }
            await fetchRegulatory();
          } catch { }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }
    } else if (activeTab === 'header-footer') {
      if (editingItem === 'header') {
        try {
          const apiUrl = getApiUrl('/api/cms/header-footer/header');
          const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify({
              logo: formData.logo || '',
              phone: formData.phone || '',
              phoneIcon: formData.phoneIcon || '',
              email: formData.email || '',
              navigationLinks: typeof formData.navigationLinks === 'string' ? formData.navigationLinks : JSON.stringify(formData.navigationLinks || []),
              isActive: !!formData.isActive
            })
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
          }

          await fetchHeader();

          // Notify pages to refresh
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('headerDataChanged'));
          }

          showToast.success('Header updated successfully!');

          setShowModal(false);
          setFormData({});
          setEditingItem(null);
        } catch (error: any) {
          console.error('Error updating header:', error);
          showToast.error(`Failed to update header: ${error.message || 'Please try again.'}`);
        }
        return;
      }
      if (editingItem === 'footer') {
        try {
          const apiUrl = getApiUrl('/api/cms/header-footer/footer');
          const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify({
              logo: formData.logo || '',
              registeredOffice: formData.registeredOffice || '',
              corporateOffice: formData.corporateOffice || '',
              phone: formData.phone || '',
              email: formData.email || '',
              socialLinks: typeof formData.socialLinks === 'string' ? formData.socialLinks : JSON.stringify(formData.socialLinks || []),
              copyright: formData.copyright || 'Copyright © 2024 3i Medical Technologies',
              navigationColumns: typeof formData.navigationColumns === 'string' ? formData.navigationColumns : JSON.stringify(formData.navigationColumns || []),
              isActive: !!formData.isActive
            })
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
          }

          await fetchFooter();

          // Notify pages to refresh
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('footerDataChanged'));
          }

          showToast.success('Footer updated successfully!');

          setShowModal(false);
          setFormData({});
          setEditingItem(null);
        } catch (error: any) {
          console.error('Error updating footer:', error);
          showToast.error(`Failed to update footer: ${error.message || 'Please try again.'}`);
        }
        return;
      }
    } else if (activeTab === 'about-page') {
      const sectionMap: { [key: string]: keyof AdminData } = {
        'about-hero': 'aboutHero',
        'about-journey-image': 'aboutJourneyImage',
        'vision-mission': 'visionMission',
        'about-sections': 'aboutSections',
        'values': 'values',
        'journey': 'journey'
      };
      sectionKey = sectionMap[activeAboutSection] as keyof AdminData;
      if (sectionKey === 'aboutJourneyImage') {
        (async () => {
          try {
            // Check if we have new images to upload
            const hasNewImages = formData.images && formData.images.some((img: any) => img.isNew && img.file);

            let response;
            if (hasNewImages) {
              // Use FormData for file uploads
              const formDataToSend = new FormData();
              formDataToSend.append('title', formData.title || 'Our Journey');
              formDataToSend.append('summary', formData.summary || '');
              formDataToSend.append('image', formData.image || '');
              formDataToSend.append('isActive', String(formData.isActive ?? true));

              // Add existing images (non-new images)
              const existingImages = formData.images.filter((img: any) => !img.isNew).map((img: any) => img.url);
              formDataToSend.append('images', JSON.stringify(existingImages));

              // Add new image files
              const newImageFiles = formData.images.filter((img: any) => img.isNew && img.file);
              for (const imageItem of newImageFiles) {
                formDataToSend.append('images', imageItem.file);
              }

              response = await fetch(getApiUrl('/api/cms/about/journey/upload'), {
                method: 'PUT',
                headers: { ...authHeaders() as any },
                body: formDataToSend
              });
            } else {
              // Use regular JSON for non-file updates
              const imageUrls = formData.images ? formData.images.map((img: any) => img.url || img) : [];
              response = await fetch(getApiUrl('/api/cms/about/journey'), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify({
                  title: formData.title || 'Our Journey',
                  summary: formData.summary || '',
                  image: formData.image || '',
                  images: imageUrls,
                  isActive: formData.isActive ?? true
                })
              });
            }
            if (response.ok) {
              // Refresh the API data to update preview
              await fetchAboutData();
              showToast.success('About Journey saved successfully!');
            } else {
              showToast.error('Failed to save About Journey');
            }
          } catch (error) {
            console.error('Error saving About Journey:', error);
            showToast.error('Error saving About Journey');
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }
      // Handle About Hero
      if (editingItem === 'about-hero') {
        (async () => {
          try {
            const response = await fetch(getApiUrl('/api/cms/about-page/hero'), {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify({
                title: formData.title || '',
                description: formData.description || '',
                backgroundImage: formData.backgroundImage || '',
                isActive: formData.isActive ?? true
              })
            });
            if (response.ok) {
              await fetchAboutHero();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('aboutHeroChanged'));
              }
              showToast.success('About Hero saved successfully!');
            } else {
              showToast.error('Failed to save About Hero');
            }
          } catch (error) {
            console.error('Error saving About Hero:', error);
            showToast.error('Error saving About Hero');
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }

      // Handle Redefining Healthcare
      if (editingItem === 'redefining-healthcare') {
        (async () => {
          try {
            const response = await fetch(getApiUrl('/api/cms/about-page/redefining-healthcare'), {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify({
                title: formData.title || '',
                description: formData.descriptionParagraphs 
                  ? (Array.isArray(formData.descriptionParagraphs) 
                    ? JSON.stringify(formData.descriptionParagraphs.filter((p: string) => p.trim())) 
                    : formData.descriptionParagraphs)
                  : '',
                buttonText: formData.buttonText || '',
                buttonLink: formData.buttonLink || '',
                buttonIcon: formData.buttonIcon || '',
                isActive: formData.isActive ?? true
              })
            });
            if (response.ok) {
              await fetchAboutRedefiningHealthcare();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('aboutRedefiningHealthcareChanged'));
              }
              showToast.success('Redefining Healthcare section saved successfully!');
            } else {
              showToast.error('Failed to save Redefining Healthcare section');
            }
          } catch (error) {
            console.error('Error saving Redefining Healthcare:', error);
            showToast.error('Error saving Redefining Healthcare section');
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }

      // Handle Explore Refex Group
      if (editingItem === 'refex-group') {
        (async () => {
          try {
            const response = await fetch(getApiUrl('/api/cms/about-page/refex-group'), {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify({
                title: formData.title || '',
                descriptionParagraph1: formData.descriptionParagraphs 
                  ? (Array.isArray(formData.descriptionParagraphs) 
                    ? JSON.stringify(formData.descriptionParagraphs) // Keep all paragraphs including empty ones
                    : formData.descriptionParagraphs)
                  : '',
                descriptionParagraph2: '', // Keep for backward compatibility but store array in paragraph1
                buttonText: formData.buttonText || '',
                buttonLink: formData.buttonLink || '',
                isActive: formData.isActive ?? true
              })
            });
            if (response.ok) {
              await fetchAboutRefexGroup();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('aboutRefexGroupChanged'));
              }
              showToast.success('Explore Refex Group section saved successfully!');
            } else {
              showToast.error('Failed to save Explore Refex Group section');
            }
          } catch (error) {
            console.error('Error saving Explore Refex Group:', error);
            showToast.error('Error saving Explore Refex Group section');
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }
    } else if (activeTab === 'mission-vision-page') {
      // Handle Mission-Vision Hero
      if (editingItem === 'mission-vision-hero') {
        console.log('🟢 Processing Mission-Vision Hero update', formData);
        try {
          const response = await fetch(getApiUrl('/api/cms/mission-vision/hero'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify({
              title: formData.title || '',
              description: formData.description || '',
              backgroundImage: formData.backgroundImage || '',
              isActive: formData.isActive ?? true
            })
          });
          if (response.ok) {
            await fetchMissionVisionHero();
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('missionVisionHeroChanged'));
            }
            showToast.success('Mission & Vision Hero saved successfully!');
            setShowModal(false);
            setFormData({});
            setEditingItem(null);
          } else {
            const errorData = await response.json().catch(() => ({ message: 'Failed to save Mission & Vision Hero' }));
            showToast.error(errorData.message || 'Failed to save Mission & Vision Hero');
          }
        } catch (error: any) {
          console.error('Error saving Mission & Vision Hero:', error);
          showToast.error(`Error saving Mission & Vision Hero: ${error.message || 'Please try again.'}`);
        }
        return;
      }

      // Handle Mission-Vision Mission
      if (editingItem === 'mission-vision-mission') {
        console.log('🟢 Processing Mission-Vision Mission update', formData);
        try {
          const response = await fetch(getApiUrl('/api/cms/mission-vision/content/mission'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify({
              icon: formData.icon || '',
              title: formData.title || '',
              description: formData.description || '',
              isActive: formData.isActive ?? true
            })
          });
          if (response.ok) {
            await fetchMissionVisionMission();
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('missionVisionMissionChanged'));
            }
            showToast.success('Mission section saved successfully!');
            setShowModal(false);
            setFormData({});
            setEditingItem(null);
          } else {
            const errorData = await response.json().catch(() => ({ message: 'Failed to save Mission section' }));
            showToast.error(errorData.message || 'Failed to save Mission section');
          }
        } catch (error: any) {
          console.error('Error saving Mission:', error);
          showToast.error(`Error saving Mission section: ${error.message || 'Please try again.'}`);
        }
        return;
      }

      // Handle Mission-Vision Vision
      if (editingItem === 'mission-vision-vision') {
        console.log('🟢 Processing Mission-Vision Vision update', formData);
        try {
          const response = await fetch(getApiUrl('/api/cms/mission-vision/content/vision'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify({
              icon: formData.icon || '',
              title: formData.title || '',
              description: formData.description || '',
              isActive: formData.isActive ?? true
            })
          });
          if (response.ok) {
            await fetchMissionVisionVision();
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('missionVisionVisionChanged'));
            }
            showToast.success('Vision section saved successfully!');
            setShowModal(false);
            setFormData({});
            setEditingItem(null);
          } else {
            const errorData = await response.json().catch(() => ({ message: 'Failed to save Vision section' }));
            showToast.error(errorData.message || 'Failed to save Vision section');
          }
        } catch (error: any) {
          console.error('Error saving Vision:', error);
          showToast.error(`Error saving Vision section: ${error.message || 'Please try again.'}`);
        }
        return;
      }
    } else if (activeTab === 'why-choose-us-page') {
      // Handle Why Choose Us Hero
      if (editingItem === 'why-choose-us-hero') {
        (async () => {
          try {
            const response = await fetch(getApiUrl('/api/cms/why-choose-us-page/hero'), {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify({
                title: formData.title || '',
                description: formData.description || '',
                backgroundImage: formData.backgroundImage || '',
                buttonText: formData.buttonText || '',
                buttonLink: formData.buttonLink || '',
                isActive: formData.isActive ?? true
              })
            });
            if (response.ok) {
              await fetchWhyChooseUsHero();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('whyChooseUsHeroChanged'));
              }
              showToast.success('Why Choose Us Hero saved successfully!');
            } else {
              showToast.error('Failed to save Why Choose Us Hero');
            }
          } catch (error) {
            console.error('Error saving Why Choose Us Hero:', error);
            showToast.error('Error saving Why Choose Us Hero');
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }

      // Handle Why Choose Us Offerings
      if (editingItem === 'why-choose-us-offerings') {
        (async () => {
          try {
            // Convert listItems array to JSON
            let listItemsJson = '[]';
            if (formData.listItems) {
              if (Array.isArray(formData.listItems)) {
                // Filter out empty items and stringify
                const filteredItems = formData.listItems.filter((item: any) => 
                  item && (item.boldText?.trim() || item.description?.trim())
                );
                listItemsJson = JSON.stringify(filteredItems);
              } else if (typeof formData.listItems === 'string') {
                // Already JSON string, use as is
                listItemsJson = formData.listItems;
              }
            }

            const response = await fetch(getApiUrl('/api/cms/why-choose-us-page/offerings'), {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify({
                title: formData.title || '',
                image: formData.image || '',
                listItems: listItemsJson,
                isActive: formData.isActive ?? true
              })
            });
            if (response.ok) {
              await fetchWhyChooseUsOfferings();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('whyChooseUsOfferingsChanged'));
              }
              showToast.success('Why Choose Us Offerings saved successfully!');
            } else {
              showToast.error('Failed to save Why Choose Us Offerings');
            }
          } catch (error) {
            console.error('Error saving Why Choose Us Offerings:', error);
            showToast.error('Error saving Why Choose Us Offerings');
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }

      // Handle Why Choose Us Advantages
      if (editingItem === 'why-choose-us-advantages') {
        (async () => {
          try {
            const response = await fetch(getApiUrl('/api/cms/why-choose-us-page/advantages'), {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify({
                title: formData.title || '',
                subtitle: formData.subtitle || '',
                cards: typeof formData.cards === 'string' ? formData.cards : JSON.stringify(formData.cards || []),
                isActive: formData.isActive ?? true
              })
            });
            if (response.ok) {
              await fetchWhyChooseUsAdvantages();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('whyChooseUsAdvantagesChanged'));
              }
              showToast.success('Why Choose Us Advantages saved successfully!');
            } else {
              showToast.error('Failed to save Why Choose Us Advantages');
            }
          } catch (error) {
            console.error('Error saving Why Choose Us Advantages:', error);
            showToast.error('Error saving Why Choose Us Advantages');
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }

      // Handle Contact Hero
      if (editingItem === 'contact-hero') {
        (async () => {
          try {
            const response = await fetch(getApiUrl('/api/cms/contact-page/hero'), {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify({
                title: formData.title || '',
                isActive: formData.isActive ?? true
              })
            });
            if (response.ok) {
              await fetchContactHero();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('contactHeroChanged'));
              }
              showToast.success('Contact Hero saved successfully!');
            } else {
              showToast.error('Failed to save Contact Hero');
            }
          } catch (error) {
            console.error('Error saving Contact Hero:', error);
            showToast.error('Error saving Contact Hero');
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }

      // Handle Contact Info Card
      if (editingItem === 'contact-info-card' || (typeof editingItem === 'object' && editingItem?.type === 'contact-info-card')) {
        (async () => {
          try {
            const cardId = typeof editingItem === 'object' && editingItem?.id ? editingItem.id : null;
            const url = cardId
              ? `/api/cms/contact-page/info-cards/${cardId}`
              : '/api/cms/contact-page/info-cards';
            const method = cardId ? 'PUT' : 'POST';

            const response = await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify({
                cardType: formData.cardType || '',
                icon: formData.icon || '',
                title: formData.title || '',
                content: formData.content || '',
                link: formData.link || '',
                order: formData.order || 0,
                isActive: formData.isActive ?? true
              })
            });
            if (response.ok) {
              await fetchContactInfoCards();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('contactInfoCardsChanged'));
              }
              showToast.success(cardId ? 'Contact Info Card updated successfully!' : 'Contact Info Card created successfully!');
            } else {
              showToast.error('Failed to save Contact Info Card');
            }
          } catch (error) {
            console.error('Error saving Contact Info Card:', error);
            showToast.error('Error saving Contact Info Card');
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }

      // Handle Contact Map
      if (editingItem === 'contact-map') {
        (async () => {
          try {
            const response = await fetch(getApiUrl('/api/cms/contact-page/map'), {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify({
                mapUrl: formData.mapUrl || '',
                isActive: formData.isActive ?? true
              })
            });
            if (response.ok) {
              await fetchContactMap();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('contactMapChanged'));
              }
              showToast.success('Contact Map saved successfully!');
            } else {
              showToast.error('Failed to save Contact Map');
            }
          } catch (error) {
            console.error('Error saving Contact Map:', error);
            showToast.error('Error saving Contact Map');
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }

      // Handle Contact Form
      if (editingItem === 'contact-form') {
        (async () => {
          try {
            const response = await fetch(getApiUrl('/api/cms/contact-page/form'), {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify({
                title: formData.title || '',
                description: formData.description || '',
                isActive: formData.isActive ?? true
              })
            });
            if (response.ok) {
              await fetchContactForm();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('contactFormChanged'));
              }
              showToast.success('Contact Form saved successfully!');
            } else {
              showToast.error('Failed to save Contact Form');
            }
          } catch (error) {
            console.error('Error saving Contact Form:', error);
            showToast.error('Error saving Contact Form');
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }


    } else if (activeTab === 'portable-xray-page') {
      if (editingItem === 'portable-xray-hero') {
        // Save hero via API
        try {
          const response = await fetch(getApiUrl('/api/cms/portable-xray/hero'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify({
              title: formData.title || 'Portable X-Ray Systems',
              subtitle: formData.subtitle || '',
              description: formData.description || '',
              backgroundImage: formData.backgroundImage || '',
              isActive: formData.isActive ?? true
            })
          });
          if (response.ok) {
            await fetchPortableXRayHero();
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('portableXRayHeroChanged'));
            }
            showToast.success('Hero section updated successfully!');
            setShowModal(false);
            setFormData({});
            setEditingItem(null);
          } else {
            const errorData = await response.json().catch(() => ({ message: 'Failed to save Hero' }));
            showToast.error(errorData.message || 'Failed to save Hero');
          }
        } catch (error: any) {
          console.error('Error updating hero:', error);
          showToast.error(`Failed to update hero section: ${error.message || 'Please try again.'}`);
        }
        return;
      }
      if (editingItem === 'portable-xray-overview') {
        // Save overview via API
        try {
          const response = await fetch(getApiUrl('/api/cms/portable-xray/overview'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify({
              title: formData.title || '',
              description: formData.description || '',
              isActive: formData.isActive ?? true
            })
          });
          if (response.ok) {
            await fetchPortableXRayOverview();
            showToast.success('Overview section updated successfully!');
            setShowModal(false);
            setFormData({});
            setEditingItem(null);
          } else {
            const errorData = await response.json().catch(() => ({ message: 'Failed to save Overview' }));
            showToast.error(errorData.message || 'Failed to save Overview');
          }
        } catch (error: any) {
          console.error('Error updating overview:', error);
          showToast.error(`Failed to update overview section: ${error.message || 'Please try again.'}`);
        }
        return;
      }
      if (editingItem === 'portable-xray-feature' || (typeof editingItem === 'object' && editingItem?.type === 'portable-xray-feature')) {
        // Save feature via API
        try {
          const payload = {
            title: formData.title || '',
            description: formData.description || '',
            icon: formData.icon || '',
            order: Number(formData.order) || 0,
            isActive: !!formData.isActive
          };
          let response;
          if (modalType === 'add') {
            response = await fetch(getApiUrl('/api/cms/portable-xray/features'), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify(payload)
            });
          } else if ((editingItem as any)?.id) {
            response = await fetch(getApiUrl(`/api/cms/portable-xray/features/${(editingItem as any).id}`), {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify(payload)
            });
          } else {
            throw new Error('Invalid edit item: missing ID');
          }
          if (response.ok) {
            await fetchPortableXRayFeatures();
            showToast.success(modalType === 'add' ? 'Feature created successfully!' : 'Feature updated successfully!');
            setShowModal(false);
            setFormData({});
            setEditingItem(null);
          } else {
            const errorData = await response.json().catch(() => ({ message: 'Failed to save feature' }));
            showToast.error(errorData.message || `Failed to ${modalType === 'add' ? 'create' : 'update'} feature`);
          }
        } catch (error: any) {
          console.error('Error saving feature:', error);
          showToast.error(`Error saving feature: ${error.message || 'Please try again.'}`);
        }
        return;
      }
      if (editingItem === 'portable-xray-specification' || (typeof editingItem === 'object' && editingItem?.type === 'portable-xray-specification')) {
        // Save specification via API
        try {
          const payload = {
            name: formData.name || '',
            value: formData.value || '',
            order: Number(formData.order) || 0,
            isActive: !!formData.isActive
          };
          let response;
          if (modalType === 'add') {
            response = await fetch(getApiUrl('/api/cms/portable-xray/specifications'), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify(payload)
            });
          } else if ((editingItem as any)?.id) {
            response = await fetch(getApiUrl(`/api/cms/portable-xray/specifications/${(editingItem as any).id}`), {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify(payload)
            });
          } else {
            throw new Error('Invalid edit item: missing ID');
          }
          if (response.ok) {
            await fetchPortableXRaySpecifications();
            showToast.success(modalType === 'add' ? 'Specification created successfully!' : 'Specification updated successfully!');
            setShowModal(false);
            setFormData({});
            setEditingItem(null);
          } else {
            const errorData = await response.json().catch(() => ({ message: 'Failed to save specification' }));
            showToast.error(errorData.message || `Failed to ${modalType === 'add' ? 'create' : 'update'} specification`);
          }
        } catch (error: any) {
          console.error('Error saving specification:', error);
          showToast.error(`Error saving specification: ${error.message || 'Please try again.'}`);
        }
        return;
      }
      if (activePortableXRaySection === 'products' || 
          editingItem === 'portable-xray-product' || 
          (typeof editingItem === 'object' && editingItem !== null && editingItem?.type === 'portable-xray-product')) {
        // Products create/update via API
        console.log('✅ Portable X-Ray product update detected', { 
          activePortableXRaySection, 
          editingItem, 
          modalType,
          hasId: !!(editingItem as any)?.id 
        });
          try {
            // Parse features if it's a string (newline-separated)
            let featuresValue = formData.features;
            if (typeof featuresValue === 'string' && featuresValue.trim()) {
              // If it's a newline-separated string, convert to JSON array
              const featuresArray = featuresValue.split('\n').filter(f => f.trim());
              featuresValue = JSON.stringify(featuresArray);
            } else if (Array.isArray(featuresValue)) {
              featuresValue = JSON.stringify(featuresValue);
            }

          // Normalize image URL - if it's a full URL, keep it; if it's relative, ensure it starts with /
          let imageUrl = formData.image || '';
          if (imageUrl && !imageUrl.startsWith('http://') && !imageUrl.startsWith('https://') && !imageUrl.startsWith('/')) {
            imageUrl = '/' + imageUrl;
          }

            const payload = {
              title: formData.title || '',
              overview: formData.overview || '',
              features: featuresValue || '',
              benefits: formData.benefits || '',
            image: imageUrl,
              sectionId: formData.sectionId || '',
              imagePosition: formData.imagePosition || 'left',
              backgroundColor: formData.backgroundColor || 'from-gray-50 to-white',
              order: Number(formData.order) || 0,
              isActive: !!formData.isActive
            };
          
          console.log('📦 Saving portable xray product:', { 
            id: (editingItem as any)?.id, 
            hasImage: !!payload.image, 
            imageUrl: payload.image 
          });
          
            if (modalType === 'add') {
            const response = await fetch(getApiUrl('/api/cms/portable-xray/products'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify(payload)
              });
            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}));
              throw new Error(errorData.message || 'Failed to create product');
            }
            const result = await response.json();
            console.log('✅ Product created:', result);
            showToast.success('Product created successfully!');
            } else if ((editingItem as any)?.id) {
              const response = await fetch(getApiUrl(`/api/cms/portable-xray/products/${(editingItem as any).id}`), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify(payload)
              });
              if (!response.ok) {
              const errorData = await response.json().catch(() => ({}));
              throw new Error(errorData.message || 'Failed to update product');
              }
            const result = await response.json();
            const updatedProduct = result?.data || result;
            console.log('✅ Product updated:', { 
              id: updatedProduct?.id, 
              title: updatedProduct?.title, 
              hasImage: !!updatedProduct?.image, 
              image: updatedProduct?.image 
            });
            showToast.success('Product updated successfully!');
            } else {
              throw new Error('Invalid edit item: missing ID');
            }
          
          // Wait a bit to ensure backend has processed
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Refresh products list
            await fetchPortableXRayProducts();
          
          // Dispatch event for ProductPageBase to refresh
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('portableXRayProductsChanged'));
            }
          
          // Close modal after successful update
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
          console.log('✅ Modal closed after successful update');
        } catch (error: any) {
          console.error('❌ Error saving portable xray product:', error);
          showToast.error(`Failed to ${modalType === 'add' ? 'create' : 'update'} product: ${error.message || 'Please try again.'}`);
          // Don't close modal on error so user can fix and retry
        }
        return;
      } else {
        console.log('⚠️ Portable X-Ray products condition not met', { 
          activePortableXRaySection, 
          editingItem,
          check1: activePortableXRaySection === 'products',
          check2: editingItem === 'portable-xray-product',
          check3: typeof editingItem === 'object' && editingItem !== null && editingItem?.type === 'portable-xray-product'
        });
      }

    } else if (activeTab === 'radiography-page') {
      if (editingItem === 'radiography-hero' || editingItem === 'radiography-systems-hero') {
        // Save hero via API
        (async () => {
          try {
            const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
            await fetch(`${apiUrl}/api/cms/radiography/hero`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify({
                title: formData.title || 'Radiography Systems',
                subtitle: formData.subtitle || '',
                description: formData.description || '',
                backgroundImage: formData.backgroundImage || '',
                isActive: formData.isActive ?? true
              })
            });
            // Trigger refresh if using ProductPageBase
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('radiographyHeroChanged'));
            }
            showToast.success('Hero section updated successfully!');
          } catch (error: any) {
            console.error('Error updating hero:', error);
            showToast.error(`Failed to update hero section: ${error.message || 'Please try again.'}`);
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }
      if ((editingItem === 'radiography-product' || editingItem === 'radiography-systems-product' || (typeof editingItem === 'object' && editingItem !== null && (editingItem?.type === 'radiography-product' || editingItem?.type === 'radiography-systems-product'))) || activeRadiographySection === 'products') {
        // Products create/update via API
        (async () => {
          try {
            // Parse features if it's a string (newline-separated)
            let featuresValue = formData.features;
            if (typeof featuresValue === 'string' && featuresValue.trim()) {
              // If it's a newline-separated string, convert to JSON array
              const featuresArray = featuresValue.split('\n').filter(f => f.trim());
              featuresValue = JSON.stringify(featuresArray);
            } else if (Array.isArray(featuresValue)) {
              featuresValue = JSON.stringify(featuresValue);
            }

            const payload = {
              title: formData.title || '',
              overview: formData.overview || '',
              features: featuresValue || '',
              benefits: formData.benefits || '',
              image: formData.image || '',
              sectionId: formData.sectionId || '',
              imagePosition: formData.imagePosition || 'left',
              backgroundColor: formData.backgroundColor || 'from-gray-50 to-white',
              order: Number(formData.order) || 0,
              isActive: !!formData.isActive
            };
            const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
            if (modalType === 'add') {
              await fetch(`${apiUrl}/api/cms/radiography/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify(payload)
              });
            } else if ((editingItem as any)?.id) {
              const response = await fetch(`${apiUrl}/api/cms/radiography/products/${(editingItem as any).id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify(payload)
              });
              if (!response.ok) {
                throw new Error('Failed to update product');
              }
            } else {
              throw new Error('Invalid edit item: missing ID');
            }
            // Trigger refresh if using ProductPageBase
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('radiographyProductsChanged'));
            }
            showToast.success(modalType === 'add' ? 'Product created successfully!' : 'Product updated successfully!');
          } catch (error: any) {
            console.error('Error saving product:', error);
            showToast.error(`Failed to ${modalType === 'add' ? 'create' : 'update'} product: ${error.message || 'Please try again.'}`);
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }

    } else if (activeTab === 'flat-panel-page') {
      if (editingItem === 'flat-panel-hero' || editingItem === 'flat-panel-detectors-hero') {
        // Save hero via API
        (async () => {
          try {
            const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
            await fetch(`${apiUrl}/api/cms/flat-panel/hero`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify({
                title: formData.title || 'Flat Panel Detectors',
                subtitle: formData.subtitle || '',
                description: formData.description || '',
                backgroundImage: formData.backgroundImage || '',
                isActive: formData.isActive ?? true
              })
            });
            // Trigger refresh if using ProductPageBase
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('flatPanelHeroChanged'));
            }
            showToast.success('Hero section updated successfully!');
          } catch (error: any) {
            console.error('Error updating hero:', error);
            showToast.error(`Failed to update hero section: ${error.message || 'Please try again.'}`);
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }
      if ((editingItem === 'flat-panel-product' || editingItem === 'flat-panel-detectors-product' || (typeof editingItem === 'object' && editingItem !== null && (editingItem?.type === 'flat-panel-product' || editingItem?.type === 'flat-panel-detectors-product'))) || activeFlatPanelSection === 'products') {
        // Products create/update via API
        (async () => {
          try {
            // Parse features if it's a string (newline-separated)
            let featuresValue = formData.features;
            if (typeof featuresValue === 'string' && featuresValue.trim()) {
              // If it's a newline-separated string, convert to JSON array
              const featuresArray = featuresValue.split('\n').filter(f => f.trim());
              featuresValue = JSON.stringify(featuresArray);
            } else if (Array.isArray(featuresValue)) {
              featuresValue = JSON.stringify(featuresValue);
            }

            const payload = {
              title: formData.title || '',
              overview: formData.overview || '',
              features: featuresValue || '',
              benefits: formData.benefits || '',
              image: formData.image || '',
              sectionId: formData.sectionId || '',
              imagePosition: formData.imagePosition || 'left',
              backgroundColor: formData.backgroundColor || 'from-gray-50 to-white',
              order: Number(formData.order) || 0,
              isActive: !!formData.isActive
            };
            const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
            if (modalType === 'add') {
              await fetch(`${apiUrl}/api/cms/flat-panel/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify(payload)
              });
            } else if ((editingItem as any)?.id) {
              const response = await fetch(`${apiUrl}/api/cms/flat-panel/products/${(editingItem as any).id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify(payload)
              });
              if (!response.ok) {
                throw new Error('Failed to update product');
              }
            } else {
              throw new Error('Invalid edit item: missing ID');
            }
            // Trigger refresh if using ProductPageBase
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('flatPanelProductsChanged'));
            }
            showToast.success(modalType === 'add' ? 'Product created successfully!' : 'Product updated successfully!');
          } catch (error: any) {
            console.error('Error saving product:', error);
            showToast.error(`Failed to ${modalType === 'add' ? 'create' : 'update'} product: ${error.message || 'Please try again.'}`);
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }

    } else if (activeTab === 'mammography-page') {
      if (editingItem === 'mammography-hero' || editingItem === 'mammography-systems-hero') {
        // Save hero via API
        (async () => {
          try {
            const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
            await fetch(`${apiUrl}/api/cms/mammography/hero`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify({
                title: formData.title || 'Mammography Systems',
                subtitle: formData.subtitle || '',
                description: formData.description || '',
                backgroundImage: formData.backgroundImage || '',
                isActive: formData.isActive ?? true
              })
            });
            // Trigger refresh if using ProductPageBase
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('mammographyHeroChanged'));
            }
            showToast.success('Hero section updated successfully!');
          } catch (error: any) {
            console.error('Error updating hero:', error);
            showToast.error(`Failed to update hero section: ${error.message || 'Please try again.'}`);
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }
      if ((editingItem === 'mammography-product' || editingItem === 'mammography-systems-product' || (typeof editingItem === 'object' && editingItem !== null && (editingItem?.type === 'mammography-product' || editingItem?.type === 'mammography-systems-product'))) || activeMammographySection === 'products') {
        // Products create/update via API
        (async () => {
          try {
            // Parse features if it's a string (newline-separated)
            let featuresValue = formData.features;
            if (typeof featuresValue === 'string' && featuresValue.trim()) {
              // If it's a newline-separated string, convert to JSON array
              const featuresArray = featuresValue.split('\n').filter(f => f.trim());
              featuresValue = JSON.stringify(featuresArray);
            } else if (Array.isArray(featuresValue)) {
              featuresValue = JSON.stringify(featuresValue);
            }

            const payload = {
              title: formData.title || '',
              overview: formData.overview || '',
              features: featuresValue || '',
              benefits: formData.benefits || '',
              image: formData.image || '',
              sectionId: formData.sectionId || '',
              imagePosition: formData.imagePosition || 'left',
              backgroundColor: formData.backgroundColor || 'from-gray-50 to-white',
              order: Number(formData.order) || 0,
              isActive: !!formData.isActive
            };
            const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
            if (modalType === 'add') {
              await fetch(`${apiUrl}/api/cms/mammography/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify(payload)
              });
            } else if ((editingItem as any)?.id) {
              const response = await fetch(`${apiUrl}/api/cms/mammography/products/${(editingItem as any).id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify(payload)
              });
              if (!response.ok) {
                throw new Error('Failed to update product');
              }
            } else {
              throw new Error('Invalid edit item: missing ID');
            }
            // Trigger refresh if using ProductPageBase
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('mammographyProductsChanged'));
            }
            showToast.success(modalType === 'add' ? 'Product created successfully!' : 'Product updated successfully!');
          } catch (error: any) {
            console.error('Error saving product:', error);
            showToast.error(`Failed to ${modalType === 'add' ? 'create' : 'update'} product: ${error.message || 'Please try again.'}`);
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }

    } else if (activeTab === 'mri-page') {
      if (editingItem === 'refurbished-mri-hero' || editingItem === 'refurbished-mri-systems-hero') {
        // Save hero via API
        (async () => {
          try {
            const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
            await fetch(`${apiUrl}/api/cms/refurbished-mri/hero`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify({
                title: formData.title || 'Refurbished MRI Systems',
                subtitle: formData.subtitle || '',
                description: formData.description || '',
                backgroundImage: formData.backgroundImage || '',
                isActive: formData.isActive ?? true
              })
            });
            // Trigger refresh if using ProductPageBase
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('refurbishedMRIHeroChanged'));
            }
            showToast.success('Hero section updated successfully!');
          } catch (error: any) {
            console.error('Error updating hero:', error);
            showToast.error(`Failed to update hero section: ${error.message || 'Please try again.'}`);
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }
      if ((editingItem === 'refurbished-mri-product' || editingItem === 'refurbished-mri-systems-product' || (typeof editingItem === 'object' && editingItem !== null && (editingItem?.type === 'refurbished-mri-product' || editingItem?.type === 'refurbished-mri-systems-product'))) || activeRefurbishedMRISection === 'products') {
        // Products create/update via API
        (async () => {
          try {
            // Parse features if it's a string (newline-separated)
            let featuresValue = formData.features;
            if (typeof featuresValue === 'string' && featuresValue.trim()) {
              // If it's a newline-separated string, convert to JSON array
              const featuresArray = featuresValue.split('\n').filter(f => f.trim());
              featuresValue = JSON.stringify(featuresArray);
            } else if (Array.isArray(featuresValue)) {
              featuresValue = JSON.stringify(featuresValue);
            }

            const payload = {
              title: formData.title || '',
              overview: formData.overview || '',
              features: featuresValue || '',
              benefits: formData.benefits || '',
              image: formData.image || '',
              sectionId: formData.sectionId || '',
              imagePosition: formData.imagePosition || 'left',
              backgroundColor: formData.backgroundColor || 'from-gray-50 to-white',
              order: Number(formData.order) || 0,
              isActive: !!formData.isActive
            };
            const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
            if (modalType === 'add') {
              await fetch(`${apiUrl}/api/cms/refurbished-mri/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify(payload)
              });
            } else if ((editingItem as any)?.id) {
              const response = await fetch(`${apiUrl}/api/cms/refurbished-mri/products/${(editingItem as any).id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
                body: JSON.stringify(payload)
              });
              if (!response.ok) {
                throw new Error('Failed to update product');
              }
            } else {
              throw new Error('Invalid edit item: missing ID');
            }
            // Trigger refresh if using ProductPageBase
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('refurbishedMRIProductsChanged'));
            }
            showToast.success(modalType === 'add' ? 'Product created successfully!' : 'Product updated successfully!');
          } catch (error: any) {
            console.error('Error saving product:', error);
            showToast.error(`Failed to ${modalType === 'add' ? 'create' : 'update'} product: ${error.message || 'Please try again.'}`);
          }
        })();
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }

    } else if (activeTab === 'search-results-page') {
      if (editingItem === 'search-result' || (typeof editingItem === 'object' && editingItem?.type === 'search-result')) {
        // Search Results create/update via API
        try {
          const payload = {
            title: formData.title || '',
            date: formData.date || '',
            url: formData.url || '',
            pageNumber: Number(formData.pageNumber) || 1,
            displayOrder: Number(formData.displayOrder) || 0,
            isActive: !!formData.isActive
          };

          let response;
          if (modalType === 'add') {
            response = await fetch(getApiUrl('/api/cms/search-results'), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify(payload)
            });
          } else if ((editingItem as any)?.id) {
            response = await fetch(getApiUrl(`/api/cms/search-results/${(editingItem as any).id}`), {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify(payload)
            });
          } else {
            throw new Error('Invalid edit item: missing ID');
          }

          if (!response.ok) {
            throw new Error('Failed to save search result');
          }

          await fetchSearchResults();
          showToast.success(modalType === 'add' ? 'Search result created successfully!' : 'Search result updated successfully!');
        } catch (error: any) {
          console.error('Error saving search result:', error);
          showToast.error(`Failed to ${modalType === 'add' ? 'create' : 'update'} search result: ${error.message || 'Please try again.'}`);
        }
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }

    } else if (activeTab === 'user-management') {
      if (editingItem === 'user' || (typeof editingItem === 'object' && editingItem?.type === 'user')) {
        // User create/update via API
        try {
          const payload: any = {
            first_name: formData.first_name || '',
            last_name: formData.last_name || '',
            email: formData.email || '',
            user_type: formData.user_type || 'HR',
            mobile_number: formData.mobile_number || '',
            is_active: formData.is_active !== undefined ? formData.is_active : true
          };

          // Only include password if provided (for updates) or if creating new user
          if (formData.password) {
            payload.password = formData.password;
          } else if (modalType === 'add') {
            // Default password for new users
            payload.password = 'DefaultPassword123!';
          }

          let response;
          if (modalType === 'add') {
            response = await fetch(getApiUrl('/api/cms/users'), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify(payload)
            });
          } else if ((editingItem as any)?.id) {
            response = await fetch(getApiUrl(`/api/cms/users/${(editingItem as any).id}`), {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify(payload)
            });
          } else {
            throw new Error('Invalid edit item: missing ID');
          }

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to save user');
          }

          await fetchUsers();
          showToast.success(modalType === 'add' ? 'User created successfully!' : 'User updated successfully!');
        } catch (error: any) {
          console.error('Error saving user:', error);
          showToast.error(`Failed to ${modalType === 'add' ? 'create' : 'update'} user: ${error.message || 'Please try again.'}`);
        }
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }

    } else if (activeTab === 'imaging-accessories-page') {
      if (editingItem === 'imaging-accessories-hero') {
        // Save hero via API
        try {
          const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
          const response = await fetch(`${apiUrl}/api/cms/imaging-accessories/hero`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify({
              title: formData.title || 'Imaging Accessories',
              subtitle: formData.subtitle || '',
              description: formData.description || '',
              backgroundImage: formData.backgroundImage || '',
              isActive: formData.isActive ?? true
            })
          });
          if (response.ok) {
            // Trigger refresh if using ProductPageBase
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('imagingAccessoriesHeroChanged'));
            }
            showToast.success('Imaging Accessories Hero saved successfully!');
            setShowModal(false);
            setFormData({});
            setEditingItem(null);
          } else {
            const errorData = await response.json().catch(() => ({ message: 'Failed to save Hero' }));
            showToast.error(errorData.message || 'Failed to save Imaging Accessories Hero');
          }
        } catch (error: any) {
          console.error('Error saving Imaging Accessories Hero:', error);
          showToast.error(`Error saving Hero: ${error.message || 'Please try again.'}`);
        }
        return;
      }
      if (editingItem === 'imaging-accessories-product' || (typeof editingItem === 'object' && editingItem !== null && editingItem?.type === 'imaging-accessories-product')) {
        // Products create/update via API
        try {
          // Parse features if it's a string (newline-separated)
          let featuresValue = formData.features;
          if (typeof featuresValue === 'string' && featuresValue.trim()) {
            // If it's a newline-separated string, convert to JSON array
            const featuresArray = featuresValue.split('\n').filter(f => f.trim());
            featuresValue = JSON.stringify(featuresArray);
          } else if (Array.isArray(featuresValue)) {
            featuresValue = JSON.stringify(featuresValue);
          }

          const payload = {
            title: formData.title || '',
            overview: formData.overview || '',
            features: featuresValue || '',
            benefits: formData.benefits || '',
            image: formData.image || '',
            sectionId: formData.sectionId || '',
            imagePosition: formData.imagePosition || 'left',
            backgroundColor: formData.backgroundColor || 'from-gray-50 to-white',
            order: Number(formData.order) || 0,
            isActive: !!formData.isActive
          };

          const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
          let response;
          if (modalType === 'add') {
            response = await fetch(`${apiUrl}/api/cms/imaging-accessories/products`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify(payload)
            });
          } else if ((editingItem as any)?.id) {
            response = await fetch(`${apiUrl}/api/cms/imaging-accessories/products/${(editingItem as any).id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
              body: JSON.stringify(payload)
            });
          } else {
            throw new Error('Invalid edit item: missing ID');
          }

          if (response.ok) {
            // Trigger refresh if using ProductPageBase
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('imagingAccessoriesProductsChanged'));
            }
            showToast.success(modalType === 'add' ? 'Product created successfully!' : 'Product updated successfully!');
            setShowModal(false);
            setFormData({});
            setEditingItem(null);
          } else {
            const errorData = await response.json().catch(() => ({ message: 'Failed to save product' }));
            showToast.error(errorData.message || `Failed to ${modalType === 'add' ? 'create' : 'update'} product`);
          }
        } catch (error: any) {
          console.error('Error saving product:', error);
          showToast.error(`Error saving product: ${error.message || 'Please try again.'}`);
        }
        return;
      }
    } else if (activeTab === 'fpd-carm-page') {
      if (editingItem === 'fpd-carm-hero') {
        // Save hero via API
        try {
          const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
          const response = await fetch(`${apiUrl}/api/cms/fpd-carm/hero`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify({
              title: formData.title || 'FPD C-ARM',
              subtitle: formData.subtitle || '',
              description: formData.description || '',
              backgroundImage: formData.backgroundImage || '',
              isActive: formData.isActive ?? true
            })
          });
          if (response.ok) {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('fpdCarmHeroChanged'));
            }
            showToast.success('FPD C-ARM Hero saved successfully!');
            setShowModal(false);
            setFormData({});
            setEditingItem(null);
          } else {
            const errorData = await response.json().catch(() => ({ message: 'Failed to save Hero' }));
            showToast.error(errorData.message || 'Failed to save FPD C-ARM Hero');
          }
        } catch (error: any) {
          console.error('Error saving FPD C-ARM Hero:', error);
          showToast.error(`Error saving Hero: ${error.message || 'Please try again.'}`);
        }
        return;
      }
      if (editingItem === 'fpd-carm-content') {
        // Save content via API
        try {
          // Parse features and benefits if they're newline-separated strings
          let featuresValue = formData.features;
          let benefitsValue = formData.benefits;
          
          if (typeof featuresValue === 'string' && featuresValue.trim()) {
            const featuresArray = featuresValue.split('\n').filter(f => f.trim());
            featuresValue = JSON.stringify(featuresArray);
          }
          
          if (typeof benefitsValue === 'string' && benefitsValue.trim()) {
            const benefitsArray = benefitsValue.split('\n').filter(b => b.trim());
            benefitsValue = JSON.stringify(benefitsArray);
          }

          const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
          const response = await fetch(`${apiUrl}/api/cms/fpd-carm/content`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() as any },
            body: JSON.stringify({
              overview: formData.overview || '',
              features: featuresValue || '',
              benefits: benefitsValue || '',
              productImage: formData.productImage || '',
              isActive: formData.isActive ?? true
            })
          });
          if (response.ok) {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('fpdCarmContentChanged'));
            }
            showToast.success('FPD C-ARM Content saved successfully!');
            setShowModal(false);
            setFormData({});
            setEditingItem(null);
          } else {
            const errorData = await response.json().catch(() => ({ message: 'Failed to save Content' }));
            showToast.error(errorData.message || 'Failed to save FPD C-ARM Content');
          }
        } catch (error: any) {
          console.error('Error saving FPD C-ARM Content:', error);
          showToast.error(`Error saving Content: ${error.message || 'Please try again.'}`);
        }
        return;
      }
    } else if (activeTab === 'contact-page') {
      if (editingItem === 'contact-hero') {
        // Update all hero fields
        const next = {
          ...(data as any).contactHero,
          title: formData.title || '',
          subtitle: formData.subtitle || '',
          description: formData.description || '',
          backgroundImage: formData.backgroundImage || '',
          isActive: formData.isActive ?? true
        };
        updateData('contactHero' as any, next);
        setEditingItem(null);
        setFormData({});
        return;
      }
      if (editingItem === 'contact-get-in-touch') {
        // Update all get in touch fields
        const next = {
          ...(data as any).contactGetInTouch,
          title: formData.title || '',
          description: formData.description || '',
          location: {
            title: formData.locationTitle || '',
            address: formData.locationAddress || '',
            icon: formData.locationIcon || '',
            color: formData.locationColor || ''
          },
          phone: {
            title: formData.phoneTitle || '',
            number: formData.phoneNumber || '',
            hours: formData.phoneHours || '',
            icon: formData.phoneIcon || '',
            color: formData.phoneColor || ''
          },
          email: {
            title: formData.emailTitle || '',
            address: formData.emailAddress || '',
            responseTime: formData.emailResponseTime || '',
            icon: formData.emailIcon || '',
            color: formData.emailColor || ''
          },
          businessHours: {
            title: formData.businessHoursTitle || '',
            mondayFriday: formData.businessHoursMondayFriday || '',
            saturday: formData.businessHoursSaturday || '',
            sunday: formData.businessHoursSunday || ''
          },
          isActive: formData.isActive ?? true
        };
        updateData('contactGetInTouch' as any, next);
        setEditingItem(null);
        setFormData({});
        return;
      }
      if (editingItem === 'contact-user') {
        if (modalType === 'add') {
          const newUser = {
            id: Date.now().toString(),
            name: formData.name || '',
            email: formData.email || '',
            phone: formData.phone || '',
            department: formData.department || '',
            position: formData.position || '',
            avatar: formData.avatar || '',
            isActive: formData.isActive ?? true,
            order: formData.order || 0
          };
          const updatedUsers = [...((data as any).contactUsers || []), newUser];
          updateData('contactUsers' as any, updatedUsers);
        } else {
          const updatedUsers = ((data as any).contactUsers || []).map((user: any) =>
            user.id === formData.id
              ? {
                ...user,
                name: formData.name || '',
                email: formData.email || '',
                phone: formData.phone || '',
                department: formData.department || '',
                position: formData.position || '',
                avatar: formData.avatar || '',
                isActive: formData.isActive ?? true,
                order: formData.order || 0
              }
              : user
          );
          updateData('contactUsers' as any, updatedUsers);
        }
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }
      if (editingItem === 'home-global-impact') {
        // Update home global impact section
        const next = {
          ...(data as any).homeGlobalImpact,
          title: formData.title || '',
          description: formData.description || '',
          isActive: formData.isActive ?? true
        };
        updateData('homeGlobalImpact' as any, next);
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
        return;
      }
    } else {
      return;
    }

    if (sectionKey === 'aboutJourneyImage') {
      updateData('aboutJourneyImage', formData.image || '');
    } else if (sectionKey === 'visionMission') {
      const normalized = { ...formData } as any;
      if (typeof normalized.missionPointsRaw === 'string') {
        try {
          normalized.missionPoints = JSON.parse(normalized.missionPointsRaw);
        } catch { }
        delete normalized.missionPointsRaw;
      }
      // Save to API instead of local data
      saveAboutVisionMission(normalized);
    } else {
      // Removed capabilitiesFacilities section - no longer needed
      if (modalType === 'add') {
        if (typeof formData.achievementsRaw === 'string') {
          formData.achievements = (formData.achievementsRaw as string).split('\n').map(s => s.trim()).filter(Boolean);
          delete formData.achievementsRaw;
        }

      } else {
        if (typeof formData.achievementsRaw === 'string') {
          formData.achievements = (formData.achievementsRaw as string).split('\n').map(s => s.trim()).filter(Boolean);
          delete formData.achievementsRaw;
        }

      }
    }

    setShowModal(false);
    setFormData({});
    setEditingItem(null);
    setImagePreview(null);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        showToast.error('Please select an image file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast.error('Image size should be less than 5MB');
        return;
      }

      try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('image', file);

        // Upload image to server
        const response = await fetch(getApiUrl('/api/upload/image'), {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          const imageUrl = `${result.imageUrl}`;

          // Set preview and form data
          setImagePreview(imageUrl);
          setFormData((prev: any) => ({
            ...prev,
            image: imageUrl
          }));

          showToast.success('Image uploaded successfully!');
        } else {
          const error = await response.json();
          showToast.error(`Upload failed: ${error.error || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Upload error:', error);
        showToast.error('Failed to upload image. Please try again.');
      }
    }
  };

  const StatCard = ({ title, value, icon, color, change }: any) => (
    <div className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition-all duration-300 transform hover:scale-105" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">{value}</p>
          {change && (
            <p className="text-sm text-green-600 flex items-center mt-2 font-medium">
              <i className="ri-arrow-up-line mr-1"></i>
              {change}
            </p>
          )}
        </div>
        <div className="w-14 h-14 rounded-xl flex items-center justify-center backdrop-blur-sm bg-gradient-to-br from-blue-100 to-teal-100 shadow-lg" style={{ backgroundColor: `${color}15` }}>
          <i className={`${icon} text-2xl`} style={{ color }}></i>
        </div>
      </div>
    </div>
  );

  const DataTable = ({ title, data, columns, onEdit, onDelete }: any) => (
    <div className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl overflow-hidden border border-white/40">
      <div className="px-6 py-4 border-b border-white/30 bg-gradient-to-r from-blue-500/10 to-teal-500/10">
        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/20">
          <thead className="backdrop-blur-sm bg-white/40">
            <tr>
              {columns.map((col: any, index: number) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
              )}
            </tr>
          </thead>
          <tbody className="backdrop-blur-sm bg-white/30 divide-y divide-white/20">
            {data.map((item: any, index: number) => (
              <tr key={item.id || index} className="hover:bg-white/50 transition-colors duration-200">
                {columns.map((col: any, colIndex: number) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                    {col.render ? col.render(item[col.key], item) : (item[col.key] ?? '')}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                      {onEdit && (
                    <button
                          onClick={() => onEdit(item)}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-all duration-200"
                      title="Edit"
                    >
                      <i className="ri-edit-line text-lg"></i>
                    </button>
                      )}
                      {onDelete && (
                    <button
                          onClick={() => onDelete(item)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                      title="Delete"
                    >
                      <i className="ri-delete-bin-line text-lg"></i>
                    </button>
                      )}
                  </div>
                </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50">
      {/* Header with Glass Morphism */}
      <header className="backdrop-blur-xl bg-white/70 shadow-lg border-b border-white/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 py-2">
            <div className="flex items-center">
              <div className="mr-4">
                <img
                  src={ASSETS.LOGOS.MAIN}
                  alt="3i MedTech"
                  className="object-contain"
                style={{ width: '70px', height: '70px', minWidth: '70px', minHeight: '70px' }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Admin Dashboard</h1>
                <p className="text-xs text-gray-600 mt-0.5">Content Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="backdrop-blur-sm bg-white/50 px-4 py-2 rounded-xl border border-white/40">
                <span className="text-sm font-medium text-gray-700">Welcome, <span className="text-blue-600 font-semibold">{user?.username}</span></span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
              >
                <i className="ri-logout-box-line mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs with Glass Morphism */}
        <div className="mb-8">
          <nav className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {(() => {
              // Get current user's permissions
              const currentUser = zustandUser || user;
              const isAdmin = currentUser?.user_type === 'Admin';
              const allowedPages = currentUser?.allowed_cms_pages 
                ? (typeof currentUser.allowed_cms_pages === 'string' 
                    ? JSON.parse(currentUser.allowed_cms_pages) 
                    : currentUser.allowed_cms_pages)
                : [];
              
              // All available tabs
              const allTabs = [
              { id: 'home-page', label: 'Home Page', icon: 'ri-home-line' },
              { id: 'header-footer', label: 'Header & Footer', icon: 'ri-layout-line' },
              { id: 'about-page', label: 'About Page', icon: 'ri-information-line' },
              { id: 'mission-vision-page', label: 'Mission & Vision', icon: 'ri-eye-line' },
              { id: 'why-choose-us-page', label: 'Why Choose Us', icon: 'ri-star-line' },
              { id: 'contact-page', label: 'Contact Page', icon: 'ri-phone-line' },
              { id: 'portable-xray-page', label: 'Portable X-Ray', icon: 'ri-scanner-line' },
              { id: 'radiography-page', label: 'Radiography Systems', icon: 'ri-scanner-2-line' },
              { id: 'flat-panel-page', label: 'Flat Panel Detectors', icon: 'ri-scan-line' },
              { id: 'mammography-page', label: 'Mammography Systems', icon: 'ri-heart-pulse-line' },
              { id: 'mri-page', label: 'Refurbished MRI', icon: 'ri-magnetic-line' },
              { id: 'imaging-accessories-page', label: 'Imaging Accessories', icon: 'ri-tools-line' },
              { id: 'fpd-carm-page', label: 'FPD C-ARM', icon: 'ri-scanner-line' },
                { id: 'user-management', label: 'User Management', icon: 'ri-user-settings-line', adminOnly: true }
              ];
              
              // Filter tabs based on permissions
              return allTabs.filter(tab => {
                // Always hide search-results and settings
                if (tab.id === 'search-results-page' || tab.id === 'settings') return false;
                
                // User Management is only for admins
                if (tab.adminOnly && !isAdmin) return false;
                
                // For non-admin users, check allowed pages
                if (!isAdmin) {
                  return allowedPages.includes(tab.id);
                }
                
                // Admins can see all pages
                return true;
              });
            })().map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg transform scale-105'
                  : 'backdrop-blur-sm bg-white/50 text-gray-700 hover:bg-white/70 hover:text-blue-600 border border-white/40'
                }`}
              >
                <i className={`${tab.icon} mr-2 ${activeTab === tab.id ? 'text-lg' : ''}`}></i>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab removed */}

        {/* Home Page Tab - Unified Management */}
        {activeTab === 'home-page' && (
          <HomePage_cms
            token={token}
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            uploadImage={uploadImageWrapper}
            uploadingImage={uploadingImage}
            setUploadingImage={setUploadingImage}
          />
        )}

        {/* Header & Footer Tab */}
        {activeTab === 'header-footer' && (
          <HeaderFooter_cms
            token={token}
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            uploadImage={uploadImageWrapper}
            uploadingImage={uploadingImage}
            setUploadingImage={setUploadingImage}
            previewMode={previewMode}
            setPreviewMode={setPreviewMode}
            previewSection={previewSection}
            setPreviewSection={setPreviewSection}
            previewData={previewData}
            setPreviewData={setPreviewData}
          />
        )}

        {/* About Page Tab */}
        {activeTab === 'about-page' && (
          <AboutPage_cms
            token={token}
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            uploadImage={uploadImageWrapper}
            uploadingImage={uploadingImage}
            setUploadingImage={setUploadingImage}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex space-x-4 overflow-x-auto">
                {[
                  { id: 'hero', label: 'Hero', icon: 'ri-layout-top-line' },
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveProductsSection(section.id as any)}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${activeProductsSection === section.id
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                  >
                    <i className={`${section.icon} mr-2`}></i>
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {activeProductsSection === 'hero' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">Product Hero Section</h3>
                  <button onClick={saveProductsHero} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                    <i className="ri-save-line mr-2"></i>
                    Save Hero
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm text-gray-600">Background Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-1 w-full border rounded px-3 py-2"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await uploadImage(file);
                          if (url) setProductsHero({ ...(productsHero || {}), backgroundImage: url });
                        }
                      }}
                    />
                    {productsHero?.backgroundImage && (
                      <div className="mt-2">
                        <img src={productsHero.backgroundImage} alt="Preview" className="w-32 h-20 object-cover rounded" />
                        <p className="text-xs text-gray-500 mt-1">Current: {productsHero.backgroundImage}</p>
                      </div>
                    )}
                    {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">Overlay From</span>
                    <input className="mt-1 w-full border rounded px-3 py-2" value={productsHero?.overlayFrom || ''} onChange={(e) => setProductsHero({ ...(productsHero || {}), overlayFrom: e.target.value })} placeholder="rgba(0,0,0,0.5)" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">Overlay To</span>
                    <input className="mt-1 w-full border rounded px-3 py-2" value={productsHero?.overlayTo || ''} onChange={(e) => setProductsHero({ ...(productsHero || {}), overlayTo: e.target.value })} placeholder="rgba(0,0,0,0.3)" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">Title Line 1</span>
                    <input className="mt-1 w-full border rounded px-3 py-2" value={productsHero?.titleLine1 || ''} onChange={(e) => setProductsHero({ ...(productsHero || {}), titleLine1: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">Title Line 2</span>
                    <input className="mt-1 w-full border rounded px-3 py-2" value={productsHero?.titleLine2 || ''} onChange={(e) => setProductsHero({ ...(productsHero || {}), titleLine2: e.target.value })} />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-sm text-gray-600">Subtitle / Tagline</span>
                    <input className="mt-1 w-full border rounded px-3 py-2" value={productsHero?.subtitle || ''} onChange={(e) => setProductsHero({ ...(productsHero || {}), subtitle: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">Highlight Text (inside subtitle)</span>
                    <input className="mt-1 w-full border rounded px-3 py-2" value={productsHero?.highlightText || ''} onChange={(e) => setProductsHero({ ...(productsHero || {}), highlightText: e.target.value })} />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-sm text-gray-600">Description Paragraph</span>
                    <textarea className="mt-1 w-full border rounded px-3 py-2 h-24" value={productsHero?.description || ''} onChange={(e) => setProductsHero({ ...(productsHero || {}), description: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">Title Color</span>
                    <input className="mt-1 w-full border rounded px-3 py-2" value={productsHero?.titleColor || ''} onChange={(e) => setProductsHero({ ...(productsHero || {}), titleColor: e.target.value })} placeholder="#ffffff" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">Subtitle Color</span>
                    <input className="mt-1 w-full border rounded px-3 py-2" value={productsHero?.subtitleColor || ''} onChange={(e) => setProductsHero({ ...(productsHero || {}), subtitleColor: e.target.value })} placeholder="rgba(255,255,255,0.9)" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">Description Color</span>
                    <input className="mt-1 w-full border rounded px-3 py-2" value={productsHero?.descriptionColor || ''} onChange={(e) => setProductsHero({ ...(productsHero || {}), descriptionColor: e.target.value })} placeholder="rgba(255,255,255,0.8)" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">AOS Type</span>
                    <input className="mt-1 w-full border rounded px-3 py-2" value={productsHero?.aosType || ''} onChange={(e) => setProductsHero({ ...(productsHero || {}), aosType: e.target.value })} placeholder="fade-up" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">AOS Duration (ms)</span>
                    <input type="number" className="mt-1 w-full border rounded px-3 py-2" value={productsHero?.aosDuration || ''} onChange={(e) => setProductsHero({ ...(productsHero || {}), aosDuration: Number(e.target.value) })} placeholder="1000" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">AOS Delay (ms)</span>
                    <input type="number" className="mt-1 w-full border rounded px-3 py-2" value={productsHero?.aosDelay || ''} onChange={(e) => setProductsHero({ ...(productsHero || {}), aosDelay: Number(e.target.value) })} placeholder="200" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">Active</span>
                    <div>
                      <input type="checkbox" checked={productsHero?.isActive ?? true} onChange={(e) => setProductsHero({ ...(productsHero || {}), isActive: e.target.checked })} />
                    </div>
                  </label>
                </div>

                {/* Preview */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Live Preview uses frontend logic after saving.</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contact Page Tab */}
        {activeTab === 'contact-page' && (
          <ContactPage_cms
            token={token}
            user={zustandUser || user}
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            uploadImage={uploadImageWrapper}
            uploadingImage={uploadingImage}
            setUploadingImage={setUploadingImage}
          />
        )}

        {/* Mission & Vision Page Tab */}
        {activeTab === 'mission-vision-page' && (
          <MissionVisionPage_cms
            token={token}
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            uploadImage={uploadImageWrapper}
            uploadingImage={uploadingImage}
            setUploadingImage={setUploadingImage}
          />
        )}

        {/* Why Choose Us Page Tab */}
        {activeTab === 'why-choose-us-page' && (
          <WhyChooseUsPage_cms
            token={token}
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            uploadImage={uploadImageWrapper}
            uploadingImage={uploadingImage}
            setUploadingImage={setUploadingImage}
          />
        )}

        {/* Portable X-Ray Page Tab */}
        {activeTab === 'portable-xray-page' && (
          <PortableXRayPage_cms
            token={token}
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            uploadImage={uploadImageWrapper}
            uploadingImage={uploadingImage}
            setUploadingImage={setUploadingImage}
          />
        )}

        {/* Flat Panel Detectors Page Tab */}
        {activeTab === 'flat-panel-page' && (
          <FlatPanelDetectorsPage_cms
            token={token}
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            uploadImage={uploadImageWrapper}
            uploadingImage={uploadingImage}
            setUploadingImage={setUploadingImage}
          />
        )}

        {/* Radiography Systems Page Tab */}
        {activeTab === 'radiography-page' && (
          <RadiographySystemsPage_cms
            token={token}
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            uploadImage={uploadImageWrapper}
            uploadingImage={uploadingImage}
            setUploadingImage={setUploadingImage}
          />
        )}

        {/* Mammography Systems Page Tab */}
        {activeTab === 'mammography-page' && (
          <MammographySystemsPage_cms
            token={token}
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            uploadImage={uploadImageWrapper}
            uploadingImage={uploadingImage}
            setUploadingImage={setUploadingImage}
          />
        )}

        {/* Refurbished MRI Systems Page Tab */}
        {activeTab === 'mri-page' && (
          <RefurbishedMRISystemsPage_cms
            token={token}
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            uploadImage={uploadImageWrapper}
            uploadingImage={uploadingImage}
            setUploadingImage={setUploadingImage}
          />
        )}

        {/* Imaging Accessories Page Tab */}
        {activeTab === 'imaging-accessories-page' && (
          <ImagingAccessoriesPage_cms
            token={token}
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            uploadImage={uploadImageWrapper}
            uploadingImage={uploadingImage}
            setUploadingImage={setUploadingImage}
          />
        )}

        {/* FPD C-ARM Page Tab */}
        {activeTab === 'fpd-carm-page' && (
          <FPDCArmPage_cms
            token={token}
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            uploadImage={uploadImageWrapper}
            uploadingImage={uploadingImage}
            setUploadingImage={setUploadingImage}
          />
        )}

        {/* Search Results Tab */}
        {activeTab === 'search-results-page' && (
          <SearchResults_cms
            token={token}
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleDelete={handleDelete}
          />
        )}

        {/* User Management Tab */}
        {activeTab === 'user-management' && (
          <UserManagement_cms
            user={user}
            token={token}
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
          />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="space-y-4">
                      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                    </label>
                      <input
                    type="text"
                    value={data.settings.siteName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  </div>
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                        </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                      </div>
                      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                    </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                  </select>
                  </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                  Save Settings
                    </button>
                  </div>
                </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Users Management</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                <i className="ri-add-line mr-2"></i>
                Add User
              </button>
            </div>
            <DataTable
              title="Users"
              data={data.users}
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'email', header: 'Email' },
                { key: 'role', header: 'Role' },
                {
                  key: 'status',
                  header: 'Status',
                  render: (value: string) => (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                      {value}
                    </span>
                  )
                }
              ]}
              onEdit={(item: any) => {
                setModalType('edit');
                setEditingItem('user');
                setFormData({
                  id: item.id,
                  name: item.name || '',
                  email: item.email || '',
                  role: item.role || '',
                  status: item.status || 'active'
                });
                setShowModal(true);
              }}
              onDelete={(item: any) => {
                if (window.confirm('Are you sure you want to delete this user?')) {
                  const updatedUsers = data.users.filter((u: any) => u.id !== item.id);
                  updateData('users', updatedUsers);
                }
              }}
            />

            {/* Contact Get in Touch Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Get in Touch Section</h3>
                <button
                  onClick={() => {
                    setEditingItem('contact-get-in-touch');
                    const getInTouchData = (data as any).contactGetInTouch || {};
                    const formDataToSet = {
                      title: getInTouchData.title || '',
                      description: getInTouchData.description || '',
                      locationTitle: getInTouchData.location?.title || '',
                      locationAddress: getInTouchData.location?.address || '',
                      locationIcon: getInTouchData.location?.icon || '',
                      locationColor: getInTouchData.location?.color || '',
                      phoneTitle: getInTouchData.phone?.title || '',
                      phoneNumber: getInTouchData.phone?.number || '',
                      phoneHours: getInTouchData.phone?.hours || '',
                      phoneIcon: getInTouchData.phone?.icon || '',
                      phoneColor: getInTouchData.phone?.color || '',
                      emailTitle: getInTouchData.email?.title || '',
                      emailAddress: getInTouchData.email?.address || '',
                      emailResponseTime: getInTouchData.email?.responseTime || '',
                      emailIcon: getInTouchData.email?.icon || '',
                      emailColor: getInTouchData.email?.color || '',
                      businessHoursTitle: getInTouchData.businessHours?.title || '',
                      businessHoursMondayFriday: getInTouchData.businessHours?.mondayFriday || '',
                      businessHoursSaturday: getInTouchData.businessHours?.saturday || '',
                      businessHoursSunday: getInTouchData.businessHours?.sunday || '',
                      isActive: getInTouchData.isActive ?? true
                    };
                    setFormData(formDataToSet);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <i className="ri-edit-line mr-2"></i>
                  Edit Get in Touch Section
                </button>
              </div>

              {/* Preview Section */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Preview</h4>
                </div>

                {/* Get in Touch Preview */}
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-4 font-rubik">
                        {(data as any).contactGetInTouch?.title || 'Get in Touch'}
                      </h4>
                      <p className="text-lg text-gray-600 leading-relaxed font-rubik">
                        {(data as any).contactGetInTouch?.description || 'Description not set'}
                      </p>
                    </div>

                    {/* Contact Details Preview */}
                    <div className="space-y-6">
                      {/* Location */}
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${(data as any).contactGetInTouch?.location?.color === 'refex-blue' ? 'bg-blue-600' :
                          (data as any).contactGetInTouch?.location?.color === 'refex-green' ? 'bg-green-600' :
                            'bg-orange-600'
                          }`}>
                          <i className={`${(data as any).contactGetInTouch?.location?.icon || 'ri-map-pin-line'} text-white text-xl`}></i>
                        </div>
                        <div>
                          <h5 className="text-lg font-semibold text-gray-900 mb-2 font-rubik">
                            {(data as any).contactGetInTouch?.location?.title || 'Our Location'}
                          </h5>
                          <p className="text-gray-600 font-rubik" dangerouslySetInnerHTML={{
                            __html: (data as any).contactGetInTouch?.location?.address || 'Address not set'
                          }}></p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${(data as any).contactGetInTouch?.phone?.color === 'refex-blue' ? 'bg-blue-600' :
                          (data as any).contactGetInTouch?.phone?.color === 'refex-green' ? 'bg-green-600' :
                            'bg-orange-600'
                          }`}>
                          <i className={`${(data as any).contactGetInTouch?.phone?.icon || 'ri-phone-line'} text-white text-xl`}></i>
                        </div>
                        <div>
                          <h5 className="text-lg font-semibold text-gray-900 mb-2 font-rubik">
                            {(data as any).contactGetInTouch?.phone?.title || 'Phone'}
                          </h5>
                          <p className="text-gray-600 font-rubik">
                            {(data as any).contactGetInTouch?.phone?.number || 'Phone number not set'}
                          </p>
                          <p className="text-sm text-gray-500 font-rubik">
                            {(data as any).contactGetInTouch?.phone?.hours || 'Hours not set'}
                          </p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${(data as any).contactGetInTouch?.email?.color === 'refex-blue' ? 'bg-blue-600' :
                          (data as any).contactGetInTouch?.email?.color === 'refex-green' ? 'bg-green-600' :
                            'bg-orange-600'
                          }`}>
                          <i className={`${(data as any).contactGetInTouch?.email?.icon || 'ri-mail-line'} text-white text-xl`}></i>
                        </div>
                        <div>
                          <h5 className="text-lg font-semibold text-gray-900 mb-2 font-rubik">
                            {(data as any).contactGetInTouch?.email?.title || 'Email'}
                          </h5>
                          <p className="text-gray-600 font-rubik">
                            {(data as any).contactGetInTouch?.email?.address || 'Email address not set'}
                          </p>
                          <p className="text-sm text-gray-500 font-rubik">
                            {(data as any).contactGetInTouch?.email?.responseTime || 'Response time not set'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Business Hours Preview */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h5 className="text-lg font-semibold text-gray-900 mb-4 font-rubik">
                        {(data as any).contactGetInTouch?.businessHours?.title || 'Business Hours'}
                      </h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-rubik">Monday - Friday</span>
                          <span className="text-gray-900 font-semibold font-rubik">
                            {(data as any).contactGetInTouch?.businessHours?.mondayFriday || 'Not set'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-rubik">Saturday</span>
                          <span className="text-gray-900 font-semibold font-rubik">
                            {(data as any).contactGetInTouch?.businessHours?.saturday || 'Not set'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-rubik">Sunday</span>
                          <span className="text-gray-900 font-semibold font-rubik">
                            {(data as any).contactGetInTouch?.businessHours?.sunday || 'Not set'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Users Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Contact Users</h3>
                <button
                  onClick={() => {
                    setModalType('add');
                    setEditingItem('contact-user');
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      department: '',
                      position: '',
                      avatar: '',
                      isActive: true,
                      order: (data as any).contactUsers?.length || 0
                    });
                    setShowModal(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <i className="ri-add-line mr-2"></i>
                  Add User
                </button>
              </div>

              {/* Users Preview */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Users Preview</h4>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {((data as any).contactUsers || [])
                      .filter((user: any) => user.isActive)
                      .sort((a: any, b: any) => a.order - b.order)
                      .map((user: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-3 mb-3">
                            <img
                              src={user.avatar || 'https://via.placeholder.com/50x50?text=User'}
                              alt={user.name}
                              className="w-12 h-12 rounded-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/50x50?text=User';
                              }}
                            />
                            <div>
                              <h5 className="font-semibold text-gray-800 text-sm">{user.name}</h5>
                              <p className="text-xs text-gray-600">{user.position}</p>
                            </div>
                          </div>
                          <div className="space-y-1 text-xs text-gray-600">
                            <p><span className="font-medium">Department:</span> {user.department}</p>
                            <p><span className="font-medium">Email:</span> {user.email}</p>
                            <p><span className="font-medium">Phone:</span> {user.phone}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Users Data Table */}
              <DataTable
                title="Contact Users"
                data={(data as any).contactUsers || []}
                columns={[
                  {
                    key: 'avatar',
                    header: 'Avatar',
                    render: (value: string, item: any) => (
                      <img
                        src={value || 'https://via.placeholder.com/40x40?text=User'}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/40x40?text=User';
                        }}
                      />
                    )
                  },
                  { key: 'name', header: 'Name' },
                  { key: 'email', header: 'Email' },
                  { key: 'phone', header: 'Phone' },
                  { key: 'department', header: 'Department' },
                  { key: 'position', header: 'Position' },
                  { key: 'order', header: 'Order' },
                  {
                    key: 'isActive',
                    header: 'Status',
                    render: (value: boolean) => (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {value ? 'Active' : 'Inactive'}
                      </span>
                    )
                  }
                ]}
                onEdit={(item: any) => {
                  setModalType('edit');
                  setEditingItem('contact-user');
                  setFormData({
                    id: item.id,
                    name: item.name || '',
                    email: item.email || '',
                    phone: item.phone || '',
                    department: item.department || '',
                    position: item.position || '',
                    avatar: item.avatar || '',
                    isActive: item.isActive ?? true,
                    order: item.order || 0
                  });
                  setShowModal(true);
                }}
                onDelete={(item: any) => {
                  const updatedUsers = ((data as any).contactUsers || []).filter((u: any) => u.id !== item.id);
                  updateData('contactUsers' as any, updatedUsers);
                }}
              />
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={data.settings.siteName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                  </select>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Hero Form - Available from any tab */}
      {editingItem === 'contact-hero' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Edit Contact Hero Section</h3>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setFormData({});
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle (optional)</label>
                  <input
                    type="text"
                    value={formData.subtitle || ''}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Main description text"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await uploadImage(file);
                        if (url) handleInputChange('backgroundImage', url);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.backgroundImage && (
                    <div className="mt-2">
                      <img src={formData.backgroundImage} alt="Preview" className="w-32 h-20 object-cover rounded" />
                      <p className="text-xs text-gray-500 mt-1">Current: {formData.backgroundImage}</p>
                    </div>
                  )}
                  {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      setFormData({});
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Contact Get in Touch Form - Available from any tab */}
      {editingItem === 'contact-get-in-touch' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Edit Get in Touch Section</h3>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setFormData({});
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Main Section */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Main Content</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Location Section */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Location</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.locationTitle || ''}
                        onChange={(e) => handleInputChange('locationTitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                      <input
                        type="text"
                        value={formData.locationIcon || ''}
                        onChange={(e) => handleInputChange('locationIcon', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ri-map-pin-line"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                      <select
                        value={formData.locationColor || ''}
                        onChange={(e) => handleInputChange('locationColor', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="refex-blue">Refex Blue</option>
                        <option value="refex-green">Refex Green</option>
                        <option value="refex-orange">Refex Orange</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address (HTML allowed)</label>
                      <textarea
                        value={formData.locationAddress || ''}
                        onChange={(e) => handleInputChange('locationAddress', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                        placeholder="Refex Building, 67, Bazullah Road&lt;br /&gt;Parthasarathy Puram, T Nagar&lt;br /&gt;Chennai, 600017"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Phone Section */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Phone</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.phoneTitle || ''}
                        onChange={(e) => handleInputChange('phoneTitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="text"
                        value={formData.phoneNumber || ''}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                      <input
                        type="text"
                        value={formData.phoneIcon || ''}
                        onChange={(e) => handleInputChange('phoneIcon', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ri-phone-line"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                      <select
                        value={formData.phoneColor || ''}
                        onChange={(e) => handleInputChange('phoneColor', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="refex-blue">Refex Blue</option>
                        <option value="refex-green">Refex Green</option>
                        <option value="refex-orange">Refex Orange</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hours</label>
                      <input
                        type="text"
                        value={formData.phoneHours || ''}
                        onChange={(e) => handleInputChange('phoneHours', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Monday - Friday, 9:00 AM - 6:00 PM IST"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email Section */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Email</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.emailTitle || ''}
                        onChange={(e) => handleInputChange('emailTitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={formData.emailAddress || ''}
                        onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                      <input
                        type="text"
                        value={formData.emailIcon || ''}
                        onChange={(e) => handleInputChange('emailIcon', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ri-mail-line"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                      <select
                        value={formData.emailColor || ''}
                        onChange={(e) => handleInputChange('emailColor', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="refex-blue">Refex Blue</option>
                        <option value="refex-green">Refex Green</option>
                        <option value="refex-orange">Refex Orange</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Response Time</label>
                      <input
                        type="text"
                        value={formData.emailResponseTime || ''}
                        onChange={(e) => handleInputChange('emailResponseTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="We'll respond within 24 hours"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Business Hours Section */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Business Hours</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.businessHoursTitle || ''}
                        onChange={(e) => handleInputChange('businessHoursTitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Monday - Friday</label>
                      <input
                        type="text"
                        value={formData.businessHoursMondayFriday || ''}
                        onChange={(e) => handleInputChange('businessHoursMondayFriday', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="9:00 AM - 6:00 PM"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Saturday</label>
                      <input
                        type="text"
                        value={formData.businessHoursSaturday || ''}
                        onChange={(e) => handleInputChange('businessHoursSaturday', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="10:00 AM - 4:00 PM"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sunday</label>
                      <input
                        type="text"
                        value={formData.businessHoursSunday || ''}
                        onChange={(e) => handleInputChange('businessHoursSunday', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Closed"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      setFormData({});
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {(() => {
                    if (editingItem === 'header') return 'Edit Header';
                    if (editingItem === 'footer') return 'Edit Footer';
                    if (editingItem === 'home-commitment-section') return 'Edit Commitment Section';
                    if (editingItem === 'home-commitment-card' || (typeof editingItem === 'object' && editingItem?.type === 'home-commitment-card')) {
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} Commitment Card`;
                    }
                    if (editingItem === 'about-hero') return 'Edit Hero Section';
                    if (editingItem === 'redefining-healthcare') return 'Edit Redefining Healthcare';
                    if (editingItem === 'refex-group') return 'Edit Explore Refex Group';
                    if (editingItem === 'mission-vision-hero') return 'Edit Hero Section';
                    if (editingItem === 'mission-vision-mission') return 'Edit Mission';
                    if (editingItem === 'mission-vision-vision') return 'Edit Vision';
                    if (editingItem === 'why-choose-us-hero') return 'Edit Hero Section';
                    if (editingItem === 'why-choose-us-offerings') return 'Edit Our Offerings';
                    if (editingItem === 'why-choose-us-advantages') return 'Edit Advantages';
                    if (editingItem === 'contact-hero') return 'Edit Hero Section';
                    if (editingItem === 'contact-info-card' || (typeof editingItem === 'object' && editingItem?.type === 'contact-info-card')) {
                      return modalType === 'add' ? 'Add Contact Info Card' : 'Edit Contact Info Card';
                    }
                    if (editingItem === 'contact-map') return 'Edit Map';
                    if (editingItem === 'contact-form') return 'Edit Form';
                    if (editingItem === 'portable-xray-hero') return 'Edit Hero Section';
                    if (editingItem === 'portable-xray-overview') return 'Edit Overview Section';
                    if (editingItem === 'portable-xray-feature' || (typeof editingItem === 'object' && editingItem?.type === 'portable-xray-feature')) {
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} Feature`;
                    }
                    if (editingItem === 'portable-xray-specification' || (typeof editingItem === 'object' && editingItem?.type === 'portable-xray-specification')) {
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} Specification`;
                    }
                    if (editingItem === 'portable-xray-product' || (typeof editingItem === 'object' && editingItem?.type === 'portable-xray-product')) {
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} Product`;
                    }
                    if (editingItem === 'radiography-hero' || editingItem === 'radiography-systems-hero') return 'Edit Hero Section';
                    if (editingItem === 'radiography-product' || editingItem === 'radiography-systems-product' || (typeof editingItem === 'object' && editingItem?.type === 'radiography-product') || (typeof editingItem === 'object' && editingItem?.type === 'radiography-systems-product')) {
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} Product`;
                    }
                    if (editingItem === 'flat-panel-hero') return 'Edit Hero Section';
                    if (editingItem === 'flat-panel-product' || (typeof editingItem === 'object' && editingItem?.type === 'flat-panel-product')) {
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} Product`;
                    }
                    if (editingItem === 'mammography-hero') return 'Edit Hero Section';
                    if (editingItem === 'mammography-product' || (typeof editingItem === 'object' && editingItem?.type === 'mammography-product')) {
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} Product`;
                    }
                    if (editingItem === 'refurbished-mri-hero') return 'Edit Hero Section';
                    if (editingItem === 'refurbished-mri-product' || (typeof editingItem === 'object' && editingItem?.type === 'refurbished-mri-product')) {
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} Product`;
                    }
                    if (editingItem === 'imaging-accessories-hero') return 'Edit Hero Section';
                    if (editingItem === 'imaging-accessories-product' || (typeof editingItem === 'object' && editingItem?.type === 'imaging-accessories-product')) {
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} Product`;
                    }
                    if (activeTab === 'portable-xray-page') {
                      if (editingItem === 'portable-xray-hero') return 'Edit Hero Section';
                      if (editingItem === 'portable-xray-overview') return 'Edit Overview Section';
                      if (editingItem === 'portable-xray-feature' || (typeof editingItem === 'object' && editingItem?.type === 'portable-xray-feature')) {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Feature`;
                      }
                      if (editingItem === 'portable-xray-specification' || (typeof editingItem === 'object' && editingItem?.type === 'portable-xray-specification')) {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Specification`;
                      }
                      if (editingItem === 'portable-xray-product' || (typeof editingItem === 'object' && editingItem?.type === 'portable-xray-product')) {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Product`;
                      }
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} ${activePortableXRaySection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
                    }
                    if (activeTab === 'home-page') {
                      if (editingItem === 'home-hero') return `${modalType === 'add' ? 'Add New' : 'Edit'} Hero`;
                      if (editingItem === 'home-about-section') return `${modalType === 'add' ? 'Add New' : 'Edit'} About Section`;
                      if (editingItem === 'home-image-box' || (typeof editingItem === 'object' && editingItem?.type === 'home-image-box')) {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Image Box`;
                      }
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} ${activeHomeSection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
                    }
                    if (activeTab === 'about-page') {
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} ${activeAboutSection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
                    }
                    if (activeTab === 'mission-vision-page') {
                      if (editingItem === 'mission-vision-hero') return 'Edit Hero Section';
                      if (editingItem === 'mission-vision-mission') return 'Edit Mission';
                      if (editingItem === 'mission-vision-vision') return 'Edit Vision';
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} ${activeMissionVisionSection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
                    }
                    if (activeTab === 'why-choose-us-page') {
                      if (editingItem === 'why-choose-us-hero') return 'Edit Hero Section';
                      if (editingItem === 'why-choose-us-offerings') return 'Edit Our Offerings';
                      if (editingItem === 'why-choose-us-advantages') return 'Edit Advantages';
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} ${activeWhyChooseUsSection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
                    }
                    if (activeTab === 'contact-page') {
                      if (editingItem === 'contact-hero') return 'Edit Hero Section';
                      if (editingItem === 'contact-info-card' || (typeof editingItem === 'object' && editingItem?.type === 'contact-info-card')) {
                        return modalType === 'add' ? 'Add Contact Info Card' : 'Edit Contact Info Card';
                      }
                      if (editingItem === 'contact-map') return 'Edit Map';
                      if (editingItem === 'contact-form') return 'Edit Form';
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} ${activeContactSection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
                    }
                    if (activeTab === 'imaging-accessories-page') {
                      if (editingItem === 'imaging-accessories-hero') return 'Edit Hero Section';
                      if (editingItem === 'imaging-accessories-hero' || (typeof editingItem === 'object' && editingItem?.type === 'imaging-accessories-hero')) {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Hero`;
                      }
                      if (editingItem === 'imaging-accessories-product' || (typeof editingItem === 'object' && editingItem?.type === 'imaging-accessories-product')) {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Product`;
                      }
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} Imaging Accessories`;
                    }
                    if (activeTab === 'radiography-page') {
                      if (editingItem === 'radiography-systems-hero' || editingItem === 'radiography-hero') {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Hero Section`;
                      }
                      if (editingItem === 'radiography-systems-product' || editingItem === 'radiography-product' || (typeof editingItem === 'object' && editingItem?.type === 'radiography-systems-product') || (typeof editingItem === 'object' && editingItem?.type === 'radiography-product')) {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Product`;
                      }
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} Radiography Systems`;
                    }
                    if (activeTab === 'flat-panel-page') {
                      if (editingItem === 'flat-panel-detectors-hero' || editingItem === 'flat-panel-hero') {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Hero Section`;
                      }
                      if (editingItem === 'flat-panel-detectors-product' || editingItem === 'flat-panel-product' || (typeof editingItem === 'object' && editingItem?.type === 'flat-panel-detectors-product') || (typeof editingItem === 'object' && editingItem?.type === 'flat-panel-product')) {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Product`;
                      }
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} Flat Panel Detectors`;
                    }
                    if (activeTab === 'mammography-page') {
                      if (editingItem === 'mammography-systems-hero' || editingItem === 'mammography-hero') {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Hero Section`;
                      }
                      if (editingItem === 'mammography-systems-product' || editingItem === 'mammography-product' || (typeof editingItem === 'object' && editingItem?.type === 'mammography-systems-product') || (typeof editingItem === 'object' && editingItem?.type === 'mammography-product')) {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Product`;
                      }
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} Mammography Systems`;
                    }
                    if (activeTab === 'refurbished-mri-page') {
                      if (editingItem === 'refurbished-mri-systems-hero' || editingItem === 'refurbished-mri-hero') {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Hero Section`;
                      }
                      if (editingItem === 'refurbished-mri-systems-product' || editingItem === 'refurbished-mri-product' || (typeof editingItem === 'object' && editingItem?.type === 'refurbished-mri-systems-product') || (typeof editingItem === 'object' && editingItem?.type === 'refurbished-mri-product')) {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Product`;
                      }
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} Refurbished MRI Systems`;
                    }
                    if (activeTab === 'fpd-carm-page') {
                      if (editingItem === 'fpd-carm-hero') {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Hero`;
                      }
                      if (editingItem === 'fpd-carm-content') {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Content`;
                      }
                      return `${modalType === 'add' ? 'Add New' : 'Edit'} FPD C-ARM`;
                    }
                    if (activeTab === 'header-footer') {
                      return editingItem === 'header' ? 'Edit Header' : editingItem === 'footer' ? 'Edit Footer' : 'Edit';
                    }
                    if (activeTab === 'search-results-page') {
                      if (editingItem === 'search-result' || (typeof editingItem === 'object' && editingItem?.type === 'search-result')) {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} Search Result`;
                      }
                    }
                    if (activeTab === 'user-management') {
                      if (editingItem === 'user' || (typeof editingItem === 'object' && editingItem?.type === 'user')) {
                        return `${modalType === 'add' ? 'Add New' : 'Edit'} User`;
                      }
                    }
                    // Default fallback - try to infer from editingItem
                    if (typeof editingItem === 'string') {
                      if (editingItem.includes('hero')) return `${modalType === 'add' ? 'Add New' : 'Edit'} Hero Section`;
                      if (editingItem.includes('product')) return `${modalType === 'add' ? 'Add New' : 'Edit'} Product`;
                      if (editingItem.includes('section')) return `${modalType === 'add' ? 'Add New' : 'Edit'} Section`;
                    }
                    if (typeof editingItem === 'object' && editingItem !== null) {
                      if (editingItem.type?.includes('hero')) return `${modalType === 'add' ? 'Add New' : 'Edit'} Hero Section`;
                      if (editingItem.type?.includes('product')) return `${modalType === 'add' ? 'Add New' : 'Edit'} Product`;
                    }
                    return `${modalType === 'add' ? 'Add New' : 'Edit'} Item`;
                  })()}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Portable X-Ray Hero Form */}
                {editingItem === 'portable-xray-hero' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Portable X-Ray Systems"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                      <input
                        type="text"
                        value={formData.subtitle || ''}
                        onChange={(e) => handleInputChange('subtitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadImage(file);
                            if (url) handleInputChange('backgroundImage', url);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {formData.backgroundImage && (
                        <div className="mt-2">
                          <img src={formData.backgroundImage} alt="Preview" className="w-32 h-20 object-cover rounded" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="portableXRayHeroIsActive"
                        checked={formData.isActive ?? true}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="portableXRayHeroIsActive" className="text-sm font-medium text-gray-700">Active</label>
                    </div>
                  </>
                )}
                {/* Portable X-Ray Product Form */}
                {(editingItem === 'portable-xray-product' || (typeof editingItem === 'object' && editingItem !== null && editingItem?.type === 'portable-xray-product')) && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Overview</label>
                      <textarea
                        value={formData.overview || ''}
                        onChange={(e) => handleInputChange('overview', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                      <textarea
                        value={typeof formData.features === 'string' ? formData.features : (Array.isArray(formData.features) ? formData.features.join('\n') : '')}
                        onChange={(e) => handleInputChange('features', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter one feature per line. They will be converted to a list.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                      <textarea
                        value={formData.benefits || ''}
                        onChange={(e) => handleInputChange('benefits', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                      <input
                        type="text"
                        value={formData.image || ''}
                        onChange={(e) => handleInputChange('image', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                        placeholder="/assets/images/products/..."
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadImage(file);
                            if (url) handleInputChange('image', url);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {formData.image && (
                        <div className="mt-2">
                          <img src={formData.image} alt="Preview" className="w-full h-40 object-cover rounded" />
                        </div>
                      )}
                      {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Section ID (for hash navigation)</label>
                      <input
                        type="text"
                        value={formData.sectionId || ''}
                        onChange={(e) => handleInputChange('sectionId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="mini90pointofcarexray"
                      />
                      <p className="text-xs text-gray-500 mt-1">Lowercase, no spaces. Used for URL hash navigation.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image Position</label>
                        <select
                          value={formData.imagePosition || 'left'}
                          onChange={(e) => handleInputChange('imagePosition', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="left">Left</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                        <select
                          value={formData.backgroundColor || 'from-gray-50 to-white'}
                          onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="from-gray-50 to-white">Gray to White</option>
                          <option value="from-white to-gray-50">White to Gray</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                      <input
                        type="number"
                        value={formData.order || 0}
                        onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="portableXRayProductIsActive"
                        checked={formData.isActive ?? true}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="portableXRayProductIsActive" className="text-sm font-medium text-gray-700">Active</label>
                    </div>
                  </>
                )}

                {/* FPD C-ARM Hero Form - Moved earlier to ensure it renders */}
                {editingItem === 'fpd-carm-hero' && (
                  <FPDCArmHeroForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    uploadImage={uploadImageWrapper}
                    uploadingImage={uploadingImage}
                  />
                )}

                {/* FPD C-ARM Content Form - Moved earlier to ensure it renders */}
                {editingItem === 'fpd-carm-content' && (
                  <FPDCArmContentForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    uploadImage={uploadImageWrapper}
                    uploadingImage={uploadingImage}
                  />
                )}

                {/* User Management Form - Moved earlier to ensure it renders */}
                {(editingItem === 'user' || (editingItem && typeof editingItem === 'object' && (editingItem as any)?.type === 'user')) && (
                  <UserManagementForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    modalType={modalType as 'add' | 'edit'}
                  />
                )}

                {/* Radiography Hero Form */}
                {(editingItem === 'radiography-hero' || editingItem === 'radiography-systems-hero') && (
                  <RadiographySystemsHeroForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    uploadImage={uploadImageWrapper}
                    uploadingImage={uploadingImage}
                  />
                )}

                {/* Radiography Product Form */}
                {(editingItem === 'radiography-product' || editingItem === 'radiography-systems-product' || (typeof editingItem === 'object' && editingItem !== null && (editingItem?.type === 'radiography-product' || editingItem?.type === 'radiography-systems-product'))) && (
                  <RadiographySystemsProductForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    uploadImage={uploadImageWrapper}
                    uploadingImage={uploadingImage}
                  />
                )}

                {/* Flat Panel Hero Form */}
                {(editingItem === 'flat-panel-hero' || editingItem === 'flat-panel-detectors-hero') && (
                  <FlatPanelDetectorsHeroForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    uploadImage={uploadImage}
                    uploadingImage={uploadingImage}
                  />
                )}

                {/* Flat Panel Product Form */}
                {(editingItem === 'flat-panel-product' || editingItem === 'flat-panel-detectors-product' || (typeof editingItem === 'object' && editingItem !== null && (editingItem?.type === 'flat-panel-product' || editingItem?.type === 'flat-panel-detectors-product'))) && (
                  <FlatPanelDetectorsProductForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    uploadImage={uploadImage}
                    uploadingImage={uploadingImage}
                  />
                )}

                {/* Mammography Hero Form */}
                {(editingItem === 'mammography-hero' || editingItem === 'mammography-systems-hero') && (
                  <MammographySystemsHeroForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    uploadImage={uploadImage}
                    uploadingImage={uploadingImage}
                  />
                )}

                {/* Mammography Product Form */}
                {(editingItem === 'mammography-product' || editingItem === 'mammography-systems-product' || (typeof editingItem === 'object' && editingItem !== null && (editingItem?.type === 'mammography-product' || editingItem?.type === 'mammography-systems-product'))) && (
                  <MammographySystemsProductForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    uploadImage={uploadImage}
                    uploadingImage={uploadingImage}
                  />
                )}

                {/* Refurbished MRI Hero Form */}
                {(editingItem === 'refurbished-mri-hero' || editingItem === 'refurbished-mri-systems-hero') && (
                  <RefurbishedMRISystemsHeroForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    uploadImage={uploadImage}
                    uploadingImage={uploadingImage}
                  />
                )}

                {/* Refurbished MRI Product Form */}
                {(editingItem === 'refurbished-mri-product' || editingItem === 'refurbished-mri-systems-product' || (typeof editingItem === 'object' && editingItem !== null && (editingItem?.type === 'refurbished-mri-product' || editingItem?.type === 'refurbished-mri-systems-product'))) && (
                  <RefurbishedMRISystemsProductForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    uploadImage={uploadImage}
                    uploadingImage={uploadingImage}
                  />
                )}

                {/* Imaging Accessories Hero Form */}
                {editingItem === 'imaging-accessories-hero' && (
                  <ImagingAccessoriesHeroForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    uploadImage={uploadImage}
                    uploadingImage={uploadingImage}
                  />
                )}

                {/* Imaging Accessories Product Form */}
                {(editingItem === 'imaging-accessories-product' || (typeof editingItem === 'object' && editingItem !== null && editingItem?.type === 'imaging-accessories-product')) && (
                  <ImagingAccessoriesProductForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    uploadImage={uploadImage}
                    uploadingImage={uploadingImage}
                  />
                )}
                {/* Home Page Forms (scoped) */}
                {activeTab === 'home-page' && (
                  <>
                    {/* Home Hero Form */}
                    {editingItem === 'home-hero' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Affordable Diagnostic Imaging Solutions"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">Use &lt;br /&gt; for line breaks</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
                          <input
                            type="text"
                            value={formData.backgroundImage || ''}
                            onChange={(e) => handleInputChange('backgroundImage', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="/images/hero-background.jpg"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('backgroundImage', url);
                              }
                            }}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <div className="mt-3">
                            {formData.backgroundImage ? (
                              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-500 mb-2 font-medium">Background Image Preview:</p>
                                <img
                                  src={formData.backgroundImage}
                                  alt="Background Preview"
                                  className="w-full max-h-60 object-cover rounded border border-gray-300 shadow-sm"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23f3f4f6" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="14"%3EImage not found%3C/text%3E%3C/svg%3E';
                                  }}
                                />
                              </div>
                            ) : (
                              <p className="text-xs text-gray-400 italic">No image URL provided. Enter a URL above to see preview.</p>
                            )}
                          </div>
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Badge Image URL</label>
                          <input
                            type="text"
                            value={formData.badgeImage || ''}
                            onChange={(e) => handleInputChange('badgeImage', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="/images/new-product-badge.png"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('badgeImage', url);
                              }
                            }}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <div className="mt-3">
                            {formData.badgeImage ? (
                              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-500 mb-2 font-medium">Badge Image Preview:</p>
                                <img
                                  src={formData.badgeImage}
                                  alt="Badge Preview"
                                  className="w-full max-w-xs max-h-40 object-contain rounded border border-gray-300 shadow-sm bg-white p-2"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="150"%3E%3Crect fill="%23f3f4f6" width="300" height="150"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="12"%3EImage not found%3C/text%3E%3C/svg%3E';
                                  }}
                                />
                              </div>
                            ) : (
                              <p className="text-xs text-gray-400 italic">No badge image URL provided. Enter a URL above to see preview.</p>
                            )}
                          </div>
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Badge Link</label>
                          <input
                            type="url"
                            value={formData.badgeLink || ''}
                            onChange={(e) => handleInputChange('badgeLink', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://anamaya.3imedtech.com/"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Badge Alt Text</label>
                          <input
                            type="text"
                            value={formData.badgeAltText || ''}
                            onChange={(e) => handleInputChange('badgeAltText', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="New Product"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="heroIsActive"
                            checked={formData.isActive !== false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="heroIsActive" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                      </>
                    )}

                    {/* Home About Section Form */}
                    {editingItem === 'home-about-section' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                          <input
                            type="text"
                            value={formData.label || ''}
                            onChange={(e) => handleInputChange('label', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="About Us"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Your Partner for Clinically Relevant and Viable Imaging Technologies"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={formData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={6}
                            placeholder="As a dedicated healthcare technology provider..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                          <div className="flex items-center gap-4">
                            <input
                              type="color"
                              value={formData.backgroundColor || '#1E4C84'}
                              onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                              className="w-20 h-10 border border-gray-300 rounded-lg cursor-pointer"
                            />
                            <input
                              type="text"
                              value={formData.backgroundColor || '#1E4C84'}
                              onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="#1E4C84"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Default: #1E4C84 (Blue background with white text)</p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="aboutSectionIsActive"
                            checked={formData.isActive !== false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="aboutSectionIsActive" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                      </>
                    )}

                    {/* Home Image Box Form */}
                    {(editingItem === 'home-image-box' || (typeof editingItem === 'object' && editingItem?.type === 'home-image-box')) && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                          <input
                            type="text"
                            value={formData.label || ''}
                            onChange={(e) => handleInputChange('label', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Imaging Equipment Experts"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Core competency in manufacturing diagnostic imaging equipment"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={formData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Description that appears on hover (e.g., Core competency in manufacturing diagnostic imaging equipment)"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                          <input
                            type="text"
                            value={formData.image || ''}
                            onChange={(e) => handleInputChange('image', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                            placeholder="/images/box-image.jpg"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('image', url);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <div className="mt-3">
                            {formData.image ? (
                              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-500 mb-2 font-medium">Image Preview:</p>
                                <img
                                  src={formData.image}
                                  alt="Image Preview"
                                  className="w-full max-h-60 object-cover rounded border border-gray-300 shadow-sm"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23f3f4f6" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="14"%3EImage not found%3C/text%3E%3C/svg%3E';
                                  }}
                                />
                              </div>
                            ) : (
                              <p className="text-xs text-gray-400 italic">No image URL provided. Enter a URL above to see preview.</p>
                            )}
                          </div>
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
                          <input
                            type="text"
                            value={formData.link || ''}
                            onChange={(e) => handleInputChange('link', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="/contact"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Link Text</label>
                          <input
                            type="text"
                            value={formData.linkText || ''}
                            onChange={(e) => handleInputChange('linkText', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Discover now"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                          <input
                            type="number"
                            value={formData.order || ''}
                            onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="imageBoxIsActive"
                            checked={formData.isActive !== false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="imageBoxIsActive" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                      </>
                    )}

                    {/* Home Commitment Section Form */}
                    {editingItem === 'home-commitment-section' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                          <input
                            type="text"
                            value={formData.label || ''}
                            onChange={(e) => handleInputChange('label', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Our Commitment"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Redefining Healthcare Through Innovation"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                          <div className="flex items-center gap-4">
                            <input
                              type="color"
                              value={formData.backgroundColor || '#F9FAFB'}
                              onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                              className="w-20 h-10 border border-gray-300 rounded-lg cursor-pointer"
                            />
                            <input
                              type="text"
                              value={formData.backgroundColor || '#F9FAFB'}
                              onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="#F9FAFB"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Footer Text (optional)</label>
                          <input
                            type="text"
                            value={formData.footerText || ''}
                            onChange={(e) => handleInputChange('footerText', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Full-service provider of medical technology solutions."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Footer Link (optional)</label>
                          <input
                            type="text"
                            value={formData.footerLink || ''}
                            onChange={(e) => handleInputChange('footerLink', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="/about"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Footer Link Text (optional)</label>
                          <input
                            type="text"
                            value={formData.footerLinkText || ''}
                            onChange={(e) => handleInputChange('footerLinkText', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Explore our Comprehensive Medical Solutions"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="commitmentIsActive"
                            checked={formData.isActive !== false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="commitmentIsActive" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                      </>
                    )}

                    {/* Home Commitment Card Form */}
                    {(editingItem === 'home-commitment-card' || (typeof editingItem === 'object' && editingItem?.type === 'home-commitment-card')) && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Affordable Excellence"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                          <input
                            type="text"
                            value={formData.icon || ''}
                            onChange={(e) => handleInputChange('icon', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                            placeholder="/assets/images/icons/affordable-excellence.png"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('icon', url);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <div className="mt-3">
                            {formData.icon ? (
                              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-500 mb-2 font-medium">Icon Preview:</p>
                                <img
                                  src={formData.icon}
                                  alt="Icon Preview"
                                  className="w-24 h-24 object-contain rounded border border-gray-300 shadow-sm"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Crect fill="%23f3f4f6" width="96" height="96" rx="4"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" fill="%239ca3af" font-family="Arial" font-size="10"%3EIcon not found%3C/text%3E%3C/svg%3E';
                                  }}
                                />
                              </div>
                            ) : (
                              <p className="text-xs text-gray-400 italic">No icon URL provided. Enter a URL above to see preview.</p>
                            )}
                          </div>
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={formData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Delivering world-class medical technology at accessible prices"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
                          <input
                            type="text"
                            value={formData.link || ''}
                            onChange={(e) => handleInputChange('link', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="/about"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Link Text</label>
                          <input
                            type="text"
                            value={formData.linkText || ''}
                            onChange={(e) => handleInputChange('linkText', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Learn More"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                          <input
                            type="number"
                            value={formData.order || 0}
                            onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="1"
                            min="1"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="cardIsActive"
                            checked={formData.isActive !== false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="cardIsActive" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                      </>
                    )}

                    {/* Hero Slides Form */}
                    {activeHomeSection === 'hero-slides' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('image', url);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {formData.image && (
                            <div className="mt-2">
                              <img src={formData.image} alt="Preview" className="w-32 h-20 object-cover rounded" />
                              <p className="text-xs text-gray-500 mt-1">Current: {formData.image}</p>
                            </div>
                          )}
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        {/* Description field intentionally removed as requested */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                          <input
                            type="number"
                            value={formData.order || ''}
                            onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive || false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                      </>
                    )}

                    {/* Statistics Form */}
                    {activeHomeSection === 'statistics' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                          <input
                            type="number"
                            value={formData.value || ''}
                            onChange={(e) => handleInputChange('value', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={formData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('image', url);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {formData.image && (
                            <div className="mt-2">
                              <img src={formData.image} alt="Preview" className="w-32 h-20 object-cover rounded" />
                              <p className="text-xs text-gray-500 mt-1">Current: {formData.image}</p>
                            </div>
                          )}
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Color Theme</label>
                          <select
                            value={formData.color || 'refex-blue'}
                            onChange={(e) => handleInputChange('color', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="refex-blue">Refex Blue (#2879b6)</option>
                            <option value="refex-green">Refex Green (#7dc244)</option>
                            <option value="refex-orange">Refex Orange (#ee6a31)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                          <input
                            type="number"
                            value={formData.order || ''}
                            onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive || false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                      </>
                    )}

                    {/* Regulatory Form */}
                    {activeHomeSection === 'regulatory' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={formData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('image', url);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {formData.image && (
                            <div className="mt-2">
                              <img src={formData.image} alt="Preview" className="w-32 h-20 object-cover rounded" />
                              <p className="text-xs text-gray-500 mt-1">Current: {formData.image}</p>
                            </div>
                          )}
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Link URL (optional)</label>
                          <input
                            type="url"
                            value={formData.link || ''}
                            onChange={(e) => handleInputChange('link', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://regulator.example"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                          <input
                            type="color"
                            value={formData.color || '#2879b6'}
                            onChange={(e) => handleInputChange('color', e.target.value)}
                            className="w-full h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                          <input
                            type="number"
                            value={formData.order || ''}
                            onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive || false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* About Page Forms */}
                {activeTab === 'about-page' && (
                  <>
                    {/* Vision & Mission Form */}
                    {activeAboutSection === 'vision-mission' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Vision Title</label>
                          <input
                            type="text"
                            value={formData.visionTitle || ''}
                            onChange={(e) => handleInputChange('visionTitle', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Vision Description</label>
                          <textarea
                            value={formData.visionDescription || ''}
                            onChange={(e) => handleInputChange('visionDescription', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Vision Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('visionImage', url);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {formData.visionImage && (
                            <div className="mt-2">
                              <img src={formData.visionImage} alt="Preview" className="w-32 h-20 object-cover rounded" />
                              <p className="text-xs text-gray-500 mt-1">Current: {formData.visionImage}</p>
                            </div>
                          )}
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mission Title</label>
                          <input
                            type="text"
                            value={formData.missionTitle || ''}
                            onChange={(e) => handleInputChange('missionTitle', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mission Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('missionImage', url);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {formData.missionImage && (
                            <div className="mt-2">
                              <img src={formData.missionImage} alt="Preview" className="w-32 h-20 object-cover rounded" />
                              <p className="text-xs text-gray-500 mt-1">Current: {formData.missionImage}</p>
                            </div>
                          )}
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mission Points (JSON)</label>
                          <textarea
                            value={formData.missionPointsRaw ?? JSON.stringify(formData.missionPoints || [], null, 2)}
                            onChange={(e) => handleInputChange('missionPointsRaw', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-xs"
                            rows={6}
                          />
                        </div>
                      </>
                    )}
                    {/* About Journey Form */}
                    {activeAboutSection === 'about-journey-image' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Journey Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Journey Summary</label>
                          <textarea
                            value={formData.summary || ''}
                            onChange={(e) => handleInputChange('summary', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Journey Images (Carousel)</label>
                          <div className="space-y-4">
                            {/* Multiple Image Upload */}
                            <div>
                              <label className="block text-sm font-medium text-gray-600 mb-2">Add New Images</label>
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={async (e) => {
                                  const files = Array.from(e.target.files || []);
                                  if (files.length > 0) {
                                    const newImages = [...(formData.images || [])];
                                    // Store actual File objects instead of uploading immediately
                                    for (const file of files) {
                                      // Create a preview URL for display
                                      const previewUrl = URL.createObjectURL(file);
                                      // Store both the file and preview URL
                                      newImages.push({
                                        file: file,
                                        preview: previewUrl,
                                        name: file.name,
                                        isNew: true
                                      });
                                    }
                                    handleInputChange('images', newImages);
                                  }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <p className="text-xs text-gray-500 mt-1">You can select multiple images at once</p>
                            </div>

                            {/* Current Images Display */}
                            {formData.images && formData.images.length > 0 && (
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                  Current Images ({formData.images.length})
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                  {formData.images.map((imageItem: any, index: number) => {
                                    const imageUrl = typeof imageItem === 'string' ? imageItem : imageItem.preview || imageItem.url;
                                    return (
                                      <div key={index} className="relative group">
                                        <img
                                          src={imageUrl}
                                          alt={`Journey ${index + 1}`}
                                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                        />
                                        <button
                                          onClick={() => {
                                            const newImages = formData.images.filter((_: any, i: number) => i !== index);
                                            handleInputChange('images', newImages);
                                          }}
                                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                          title="Remove image"
                                        >
                                          ×
                                        </button>
                                        <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                                          {index + 1}
                                        </div>
                                        {imageItem.isNew && (
                                          <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 rounded">
                                            NEW
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Legacy Single Image Support */}
                            <div className="border-t pt-4">
                              <label className="block text-sm font-medium text-gray-600 mb-2">Legacy Single Image (for backward compatibility)</label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const url = await uploadImage(file);
                                    if (url) handleInputChange('image', url);
                                  }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              {formData.image && (
                                <div className="mt-2">
                                  <img src={formData.image} alt="Legacy Preview" className="w-32 h-20 object-cover rounded" />
                                  <p className="text-xs text-gray-500 mt-1">Legacy: {formData.image}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive ?? true}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">Active</label>
                        </div>
                      </>
                    )}
                    {/* About Hero Form */}
                    {editingItem === 'about-hero' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={formData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('backgroundImage', url);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {formData.backgroundImage && (
                            <div className="mt-2">
                              <img src={formData.backgroundImage} alt="Preview" className="w-32 h-20 object-cover rounded" />
                              <p className="text-xs text-gray-500 mt-1">Current: {formData.backgroundImage}</p>
                            </div>
                          )}
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="aboutHeroIsActive"
                            checked={formData.isActive ?? true}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="aboutHeroIsActive" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                      </>
                    )}

                    {/* Redefining Healthcare Form */}
                    {editingItem === 'redefining-healthcare' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Redefining Healthcare Through Innovation"
                            required
                          />
                        </div>
                        <DynamicParagraphsField
                          paragraphs={formData.descriptionParagraphs || ['']}
                          onChange={(paragraphs) => handleInputChange('descriptionParagraphs', paragraphs)}
                          label="Description Paragraphs"
                        />
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                          <input
                            type="text"
                            value={formData.buttonText || ''}
                            onChange={(e) => handleInputChange('buttonText', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Download Our Brochure"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Button Link (PDF URL or file upload)</label>
                          <input
                            type="text"
                            value={formData.buttonLink || ''}
                            onChange={(e) => handleInputChange('buttonLink', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                            placeholder="/assets/documents/product-brochure.pdf"
                          />
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadDocument(file);
                                if (url) {
                                  handleInputChange('buttonLink', url);
                                  showToast.success('PDF uploaded successfully!');
                                }
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <p className="text-xs text-gray-500 mt-1">Upload PDF file or enter URL</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Button Icon (optional)</label>
                          <input
                            type="text"
                            value={formData.buttonIcon || ''}
                            onChange={(e) => handleInputChange('buttonIcon', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="fa fa-cloud-download"
                          />
                          <p className="text-xs text-gray-500 mt-1">Font Awesome or Remix Icon class (e.g., "fa fa-cloud-download")</p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="redefiningHealthcareIsActive"
                            checked={formData.isActive ?? true}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="redefiningHealthcareIsActive" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                      </>
                    )}

                    {/* Explore Refex Group Form */}
                    {editingItem === 'refex-group' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Explore Refex Group"
                            required
                          />
                        </div>
                        <DynamicParagraphsField
                          paragraphs={formData.descriptionParagraphs || ['']}
                          onChange={(paragraphs) => handleInputChange('descriptionParagraphs', paragraphs)}
                          label="Description Paragraphs"
                        />
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                          <input
                            type="text"
                            value={formData.buttonText || ''}
                            onChange={(e) => handleInputChange('buttonText', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Explore Refex Group"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Button Link (External URL)</label>
                          <input
                            type="url"
                            value={formData.buttonLink || ''}
                            onChange={(e) => handleInputChange('buttonLink', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://www.refex.group/"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="refexGroupIsActive"
                            checked={formData.isActive ?? true}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="refexGroupIsActive" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* Mission-Vision, Why Choose Us, and Contact Page Forms (outside About Page block) */}
                {/* Mission-Vision Hero Form */}
                {editingItem === 'mission-vision-hero' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Mission & Vision"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        placeholder="To empower healthcare providers with innovative imaging solutions..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
                      <input
                        type="text"
                        value={formData.backgroundImage || ''}
                        onChange={(e) => handleInputChange('backgroundImage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                        placeholder="/assets/images/banners/mission-vision.jpg"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadImage(file);
                            if (url) handleInputChange('backgroundImage', url);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {formData.backgroundImage && (
                        <div className="mt-2">
                          <img src={formData.backgroundImage} alt="Preview" className="w-full h-40 object-cover rounded" />
                        </div>
                      )}
                      {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="missionVisionHeroIsActive"
                        checked={formData.isActive ?? true}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="missionVisionHeroIsActive" className="text-sm font-medium text-gray-700">Active</label>
                    </div>
                  </>
                )}

                {/* Mission-Vision Mission Form */}
                {editingItem === 'mission-vision-mission' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Our Mission"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={6}
                        placeholder="To bring 'Affordable Luxury' to our products & solutions..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Icon URL</label>
                      <input
                        type="text"
                        value={formData.icon || ''}
                        onChange={(e) => handleInputChange('icon', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                        placeholder="/assets/images/icons/vision.png"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadImage(file);
                            if (url) handleInputChange('icon', url);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {formData.icon && (
                        <div className="mt-2">
                          <img src={formData.icon} alt="Icon Preview" className="w-24 h-24 object-contain rounded" />
                        </div>
                      )}
                      {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="missionVisionMissionIsActive"
                        checked={formData.isActive ?? true}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="missionVisionMissionIsActive" className="text-sm font-medium text-gray-700">Active</label>
                    </div>
                  </>
                )}

                {/* Mission-Vision Vision Form */}
                {editingItem === 'mission-vision-vision' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Our Vision"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={6}
                        placeholder="Our vision is to revolutionize the future of healthcare..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Icon URL</label>
                      <input
                        type="text"
                        value={formData.icon || ''}
                        onChange={(e) => handleInputChange('icon', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                        placeholder="/assets/images/icons/mission.png"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadImage(file);
                            if (url) handleInputChange('icon', url);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {formData.icon && (
                        <div className="mt-2">
                          <img src={formData.icon} alt="Icon Preview" className="w-24 h-24 object-contain rounded" />
                        </div>
                      )}
                      {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="missionVisionVisionIsActive"
                        checked={formData.isActive ?? true}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="missionVisionVisionIsActive" className="text-sm font-medium text-gray-700">Active</label>
                    </div>
                  </>
                )}

                {/* Why Choose Us Hero Form */}
                {editingItem === 'why-choose-us-hero' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Why Choose Us"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        placeholder="With a combined experience of delivering and installing thousands of imaging systems..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                      <input
                        type="text"
                        value={formData.buttonText || ''}
                        onChange={(e) => handleInputChange('buttonText', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Get in Touch"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                      <input
                        type="text"
                        value={formData.buttonLink || ''}
                        onChange={(e) => handleInputChange('buttonLink', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="/contact"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
                      <input
                        type="text"
                        value={formData.backgroundImage || ''}
                        onChange={(e) => handleInputChange('backgroundImage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                        placeholder="/assets/images/banners/why-choose-us.jpg"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadImage(file);
                            if (url) handleInputChange('backgroundImage', url);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {formData.backgroundImage && (
                        <div className="mt-2">
                          <img src={formData.backgroundImage} alt="Preview" className="w-full h-40 object-cover rounded" />
                        </div>
                      )}
                      {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="whyChooseUsHeroIsActive"
                        checked={formData.isActive ?? true}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="whyChooseUsHeroIsActive" className="text-sm font-medium text-gray-700">Active</label>
                    </div>
                  </>
                )}

                {/* Why Choose Us Offerings Form */}
                {editingItem === 'why-choose-us-offerings' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Our Offerings"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                      <input
                        type="text"
                        value={formData.image || ''}
                        onChange={(e) => handleInputChange('image', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                        placeholder="/assets/images/banners/why-choose-us.jpg"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadImage(file);
                            if (url) handleInputChange('image', url);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {formData.image && (
                        <div className="mt-2">
                          <img src={formData.image} alt="Preview" className="w-full h-40 object-cover rounded" />
                        </div>
                      )}
                      {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                    </div>
                    <OfferingsListItemsField
                      items={formData.listItems || [{ boldText: '', description: '' }]}
                      onChange={(items) => handleInputChange('listItems', items)}
                      label="List Items"
                    />
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="whyChooseUsOfferingsIsActive"
                        checked={formData.isActive ?? true}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="whyChooseUsOfferingsIsActive" className="text-sm font-medium text-gray-700">Active</label>
                    </div>
                  </>
                )}

                {/* Why Choose Us Advantages Form */}
                {editingItem === 'why-choose-us-advantages' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                      <input
                        type="text"
                        value={formData.subtitle || ''}
                        onChange={(e) => handleInputChange('subtitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="OUR ADVANTAGES"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Why Choose 3i MedTech?"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cards (JSON)</label>
                      <textarea
                        value={typeof formData.cards === 'string' ? formData.cards : JSON.stringify(formData.cards || [], null, 2)}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            handleInputChange('cards', parsed);
                          } catch {
                            handleInputChange('cards', e.target.value);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        rows={12}
                        placeholder='[{"icon": "ri-heart-pulse-line", "title": "Comprehensive Product Portfolio", "description": "From X-ray systems to MRI scanners..."}]'
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter JSON array of objects with "icon", "title", and "description" fields</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="whyChooseUsAdvantagesIsActive"
                        checked={formData.isActive ?? true}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="whyChooseUsAdvantagesIsActive" className="text-sm font-medium text-gray-700">Active</label>
                    </div>
                  </>
                )}

                {/* Contact Hero Form */}
                {editingItem === 'contact-hero' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Contact Us"
                        required
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="contactHeroIsActive"
                        checked={formData.isActive ?? true}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="contactHeroIsActive" className="text-sm font-medium text-gray-700">Active</label>
                    </div>
                  </>
                )}

                {/* Contact Info Card Form */}
                {(editingItem === 'contact-info-card' || (typeof editingItem === 'object' && editingItem?.type === 'contact-info-card')) && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Type</label>
                      <select
                        value={formData.cardType || 'registered-office'}
                        onChange={(e) => handleInputChange('cardType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="registered-office">Registered Office</option>
                        <option value="corporate-office">Corporate Office</option>
                        <option value="phone">Phone</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Icon Class</label>
                      <input
                        type="text"
                        value={formData.icon || ''}
                        onChange={(e) => handleInputChange('icon', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="fas fa-map-marked-alt"
                      />
                      <p className="text-xs text-gray-500 mt-1">Font Awesome icon class (e.g., "fas fa-map-marked-alt")</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Registered Office"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                      <textarea
                        value={formData.content || ''}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                        placeholder="Address or phone/email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Link (optional)</label>
                      <input
                        type="text"
                        value={formData.link || ''}
                        onChange={(e) => handleInputChange('link', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://maps.app.goo.gl/... or tel:+91... or mailto:..."
                      />
                      <p className="text-xs text-gray-500 mt-1">Google Maps link, tel: link, or mailto: link</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                      <input
                        type="number"
                        value={formData.order || 0}
                        onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="contactInfoCardIsActive"
                        checked={formData.isActive ?? true}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="contactInfoCardIsActive" className="text-sm font-medium text-gray-700">Active</label>
                    </div>
                  </>
                )}

                {/* Contact Map Form */}
                {editingItem === 'contact-map' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Embed URL</label>
                      <textarea
                        value={formData.mapUrl || ''}
                        onChange={(e) => handleInputChange('mapUrl', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        placeholder="https://www.google.com/maps/embed?pb=..."
                      />
                      <p className="text-xs text-gray-500 mt-1">Paste the full Google Maps embed URL</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="contactMapIsActive"
                        checked={formData.isActive ?? true}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="contactMapIsActive" className="text-sm font-medium text-gray-700">Active</label>
                    </div>
                  </>
                )}

                {/* Contact Form Section Form */}
                {editingItem === 'contact-form' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title (optional)</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Contact Form"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        placeholder="Description text above the form"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="contactFormIsActive"
                        checked={formData.isActive ?? true}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="contactFormIsActive" className="text-sm font-medium text-gray-700">Active</label>
                    </div>
                  </>
                )}

                {/* Email Settings Form */}
                {editingItem === 'email-settings' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                      <input
                        type="text"
                        value={formData.smtpHost || ''}
                        onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="smtp.gmail.com"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                        <input
                          type="number"
                          value={formData.smtpPort || 587}
                          onChange={(e) => handleInputChange('smtpPort', parseInt(e.target.value) || 587)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="587"
                          required
                        />
                      </div>
                      <div className="flex items-center pt-8">
                        <input
                          type="checkbox"
                          id="smtpSecure"
                          checked={formData.smtpSecure !== undefined ? formData.smtpSecure : false}
                          onChange={(e) => handleInputChange('smtpSecure', e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor="smtpSecure" className="text-sm font-medium text-gray-700">Use SSL/TLS (Port 465)</label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                      <input
                        type="text"
                        value={formData.smtpUser || ''}
                        onChange={(e) => handleInputChange('smtpUser', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your-email@gmail.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                      <input
                        type="password"
                        value={formData.smtpPassword === '***' ? '' : (formData.smtpPassword || '')}
                        onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={formData.smtpPassword === '***' ? 'Leave blank to keep current password' : 'Enter password'}
                      />
                      {formData.smtpPassword === '***' && (
                        <p className="text-xs text-gray-500 mt-1">Leave blank to keep current password</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                      <input
                        type="email"
                        value={formData.fromEmail || ''}
                        onChange={(e) => handleInputChange('fromEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="noreply@3imedtech.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                      <input
                        type="text"
                        value={formData.fromName || '3i MedTech'}
                        onChange={(e) => handleInputChange('fromName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="3i MedTech"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">To Email (Contact Form Recipient)</label>
                      <input
                        type="email"
                        value={formData.toEmail || ''}
                        onChange={(e) => handleInputChange('toEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="info@3imedtech.com"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">This is where contact form submissions will be sent</p>
                    </div>
                    <div className="border-t pt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Test Email Address</label>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={formData.testEmail || ''}
                          onChange={(e) => handleInputChange('testEmail', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="test@example.com"
                        />
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            if (!formData.testEmail) {
                              showToast.error('Please enter a test email address');
                              return;
                            }
                            
                            // First save the settings if they haven't been saved yet
                            try {
                              const payload: any = {
                                smtpHost: formData.smtpHost || '',
                                smtpPort: formData.smtpPort || 587,
                                smtpSecure: formData.smtpSecure !== undefined ? formData.smtpSecure : false,
                                smtpUser: formData.smtpUser || '',
                                fromEmail: formData.fromEmail || '',
                                fromName: formData.fromName || '3i MedTech',
                                toEmail: formData.toEmail || '',
                                isActive: formData.isActive ?? true
                              };
                              
                              // Only include password if it's not masked and not empty
                              if (formData.smtpPassword && formData.smtpPassword !== '***' && formData.smtpPassword.trim() !== '') {
                                payload.smtpPassword = formData.smtpPassword;
                              }
                              
                              // Save settings first
                              const saveRes = await fetch(getApiUrl('/api/cms/email-settings'), {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                  ...authHeaders() as any
                                },
                                body: JSON.stringify(payload)
                              });
                              
                              if (!saveRes.ok) {
                                const saveError = await saveRes.json();
                                showToast.error(saveError.message || 'Please save your SMTP settings first');
                                return;
                              }
                              
                              // Wait a bit for the email service to refresh
                              await new Promise(resolve => setTimeout(resolve, 500));
                              
                              // Now send test email
                              const testRes = await fetch(getApiUrl('/api/cms/email-settings/test'), {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                  ...authHeaders() as any
                                },
                                body: JSON.stringify({ testEmail: formData.testEmail })
                              });
                              
                              const testResult = await testRes.json();
                              
                              if (testRes.ok) {
                                showToast.success('Test email sent successfully! Check your inbox.');
                              } else {
                                showToast.error(testResult.message || testResult.error || 'Failed to send test email');
                              }
                            } catch (error: any) {
                              console.error('Error sending test email:', error);
                              showToast.error(error.message || 'Error sending test email');
                            }
                          }}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium"
                        >
                          Send Test
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Send a test email to verify your SMTP settings</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailSettingsIsActive"
                        checked={formData.isActive !== false}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="emailSettingsIsActive" className="text-sm font-medium text-gray-700">Active</label>
                    </div>
                  </>
                )}

                {/* About Page Forms (continued - About Sections, Leadership, etc.) */}
                {activeTab === 'about-page' && (
                  <>
                    {/* About Sections Form */}
                    {activeAboutSection === 'about-sections' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                          <textarea
                            value={formData.content || ''}
                            onChange={(e) => handleInputChange('content', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                          <input
                            type="text"
                            value={formData.icon || ''}
                            onChange={(e) => handleInputChange('icon', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="ri-heart-line"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                          <input
                            type="color"
                            value={formData.color || '#2879b6'}
                            onChange={(e) => handleInputChange('color', e.target.value)}
                            className="w-full h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                          <input
                            type="number"
                            value={formData.order || ''}
                            onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive || false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                            Active
                          </label>
                        </div>
                      </>
                    )}

                    {/* Leadership Form - REMOVED: Old route /api/cms/about/leadership */}
                    {false && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            value={formData.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                          <input
                            type="text"
                            value={formData.position || ''}
                            onChange={(e) => handleInputChange('position', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={formData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            required
                          />
                        </div>
                        {(activeAboutSection === 'leadership' || activeAboutSection === 'technical-leadership') && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                              value={formData.category || 'Technical Leadership Team'}
                              onChange={(e) => handleInputChange('category', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="Advisory Board">Advisory Board</option>
                              <option value="Technical Leadership Team">Technical Leadership Team</option>
                              <option value="Management Team">Management Team</option>
                            </select>
                          </div>
                        )}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
                          <div className="space-y-2">
                            {(formData.achievements || []).map((achievement: string, index: number) => (
                              <div key={index} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={achievement}
                                  onChange={(e) => {
                                    const newAchievements = [...(formData.achievements || [])];
                                    newAchievements[index] = e.target.value;
                                    handleInputChange('achievements', newAchievements);
                                  }}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder={`Achievement ${index + 1}`}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newAchievements = (formData.achievements || []).filter((_: any, i: number) => i !== index);
                                    handleInputChange('achievements', newAchievements);
                                  }}
                                  className="px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <i className="ri-delete-bin-line"></i>
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => {
                                const newAchievements = [...(formData.achievements || []), ''];
                                handleInputChange('achievements', newAchievements);
                              }}
                              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 rounded-lg transition-colors flex items-center justify-center"
                            >
                              <i className="ri-add-line mr-2"></i>
                              Add Achievement
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                            <input
                              type="text"
                              value={formData.experience || ''}
                              onChange={(e) => handleInputChange('experience', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                            <input
                              type="text"
                              value={formData.education || ''}
                              onChange={(e) => handleInputChange('education', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Color Theme</label>
                            <select
                              value={formData.color || 'refex-blue'}
                              onChange={(e) => handleInputChange('color', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="refex-blue">Refex Blue (#2879b6)</option>
                              <option value="refex-green">Refex Green (#7dc244)</option>
                              <option value="refex-orange">Refex Orange (#ee6a31)</option>
                            </select>
                            <div className="mt-2 flex space-x-2">
                              <div className="flex items-center space-x-1">
                                <div className="w-4 h-4 rounded-full bg-[#2879b6]"></div>
                                <span className="text-xs text-gray-600">Blue</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <div className="w-4 h-4 rounded-full bg-[#7dc244]"></div>
                                <span className="text-xs text-gray-600">Green</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <div className="w-4 h-4 rounded-full bg-[#ee6a31]"></div>
                                <span className="text-xs text-gray-600">Orange</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>

                          {/* Image Preview */}
                          {(imagePreview || formData.image) && (
                            <div className="mb-4">
                              <img
                                src={imagePreview || formData.image}
                                alt="Preview"
                                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                              />
                            </div>
                          )}

                          {/* Upload Option */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <p className="text-xs text-gray-500 mt-1">Max size: 1MB. Supported formats: JPG, PNG, GIF. Use external URLs for larger images.</p>
                          </div>

                          {/* URL Option */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Or Enter Image URL</label>
                            <input
                              type="text"
                              value={formData.image || ''}
                              onChange={(e) => {
                                handleInputChange('image', e.target.value);
                                setImagePreview(null);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="https://example.com/image.jpg or upload file above"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                          <input
                            type="number"
                            value={formData.order || ''}
                            onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive || false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                            Active
                          </label>
                        </div>
                      </>
                    )}

                    {/* Values Form */}
                    {activeAboutSection === 'values' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={formData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                          <input
                            type="text"
                            value={formData.icon || ''}
                            onChange={(e) => handleInputChange('icon', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="ri-heart-line"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                          <input
                            type="color"
                            value={formData.color || '#2879b6'}
                            onChange={(e) => handleInputChange('color', e.target.value)}
                            className="w-full h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                          <input
                            type="number"
                            value={formData.order || ''}
                            onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive || false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                            Active
                          </label>
                        </div>
                      </>
                    )}

                    {/* Journey Form */}
                    {activeAboutSection === 'journey' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={formData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                          <input
                            type="text"
                            value={formData.year || ''}
                            onChange={(e) => handleInputChange('year', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="2022-2023"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('image', url);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {formData.image && (
                            <div className="mt-2">
                              <img src={formData.image} alt="Preview" className="w-32 h-20 object-cover rounded" />
                              <p className="text-xs text-gray-500 mt-1">Current: {formData.image}</p>
                            </div>
                          )}
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                          <input
                            type="color"
                            value={formData.color || '#2879b6'}
                            onChange={(e) => handleInputChange('color', e.target.value)}
                            className="w-full h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                          <input
                            type="number"
                            value={formData.order || ''}
                            onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive || false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                            Active
                          </label>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* Capabilities Form - REMOVED: Old unused code */}
                {false && (
                  <>
                    {/* Capabilities Hero Form */}
                    {editingItem === 'capabilities-hero' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle (optional)</label>
                          <input
                            type="text"
                            value={formData.subtitle || ''}
                            onChange={(e) => handleInputChange('subtitle', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={formData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                            placeholder="Main description text"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Sub Description (optional)</label>
                          <textarea
                            value={formData.subDescription || ''}
                            onChange={(e) => handleInputChange('subDescription', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={2}
                            placeholder="Additional description text"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('backgroundImage', url);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {formData.backgroundImage && (
                            <div className="mt-2">
                              <img src={formData.backgroundImage} alt="Preview" className="w-32 h-20 object-cover rounded" />
                              <p className="text-xs text-gray-500 mt-1">Current: {formData.backgroundImage}</p>
                            </div>
                          )}
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                      </>
                    )}
                    {editingItem === 'capabilities-research' && (
                      <>
                        {/* Main Section */}
                        <div className="border-b border-gray-200 pb-6 mb-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Main Section</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                              <input
                                type="text"
                                value={formData.title || ''}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                              <textarea
                                value={formData.description || ''}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={4}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const url = await uploadImage(file);
                                    if (url) handleInputChange('image', url);
                                  }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              {formData.image && (
                                <div className="mt-2">
                                  <img src={formData.image} alt="Preview" className="w-32 h-20 object-cover rounded" />
                                  <p className="text-xs text-gray-500 mt-1">Current: {formData.image}</p>
                                </div>
                              )}
                              {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                            </div>
                          </div>
                        </div>

                        {/* API Card */}
                        <div className="border-b border-gray-200 pb-6 mb-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">API R&D Card</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Card Title</label>
                              <input
                                type="text"
                                value={formData.apiCard?.title || ''}
                                onChange={(e) => {
                                  console.log('API Card Title Change:', e.target.value);
                                  handleInputChange('apiCard', { ...formData.apiCard, title: e.target.value });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                              <p className="text-xs text-gray-500 mt-1">Current value: "{formData.apiCard?.title || 'empty'}"</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                              <input
                                type="text"
                                value={formData.apiCard?.subtitle || ''}
                                onChange={(e) => {
                                  console.log('API Card Subtitle Change:', e.target.value);
                                  handleInputChange('apiCard', { ...formData.apiCard, subtitle: e.target.value });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                              <p className="text-xs text-gray-500 mt-1">Current value: "{formData.apiCard?.subtitle || 'empty'}"</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Remix Icon class)</label>
                              <input
                                type="text"
                                value={formData.apiCard?.icon || ''}
                                onChange={(e) => handleInputChange('apiCard', { ...formData.apiCard, icon: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., ri-flask-line"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Color (Hex)</label>
                              <input
                                type="text"
                                value={formData.apiCard?.color || ''}
                                onChange={(e) => handleInputChange('apiCard', { ...formData.apiCard, color: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="#2879b6"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                              <div className="space-y-3">
                                {(formData.apiCard?.points || []).map((point: any, index: number) => (
                                  <div key={index} className="flex gap-2 items-start">
                                    <div className="flex-1">
                                      <input
                                        type="text"
                                        value={point.title || ''}
                                        onChange={(e) => {
                                          const newPoints = [...(formData.apiCard?.points || [])];
                                          newPoints[index] = { ...newPoints[index], title: e.target.value };
                                          handleInputChange('apiCard', { ...formData.apiCard, points: newPoints });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        placeholder="Point title"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <input
                                        type="text"
                                        value={point.description || ''}
                                        onChange={(e) => {
                                          const newPoints = [...(formData.apiCard?.points || [])];
                                          newPoints[index] = { ...newPoints[index], description: e.target.value };
                                          handleInputChange('apiCard', { ...formData.apiCard, points: newPoints });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        placeholder="Point description"
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newPoints = (formData.apiCard?.points || []).filter((_: any, i: number) => i !== index);
                                        handleInputChange('apiCard', { ...formData.apiCard, points: newPoints });
                                      }}
                                      className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                                    >
                                      <i className="ri-delete-bin-line"></i>
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newPoints = [...(formData.apiCard?.points || []), { title: '', description: '' }];
                                    handleInputChange('apiCard', { ...formData.apiCard, points: newPoints });
                                  }}
                                  className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium"
                                >
                                  <i className="ri-add-line mr-2"></i>
                                  Add Point
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* FDF Card */}
                        <div className="border-b border-gray-200 pb-6 mb-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">FDF R&D Card</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Card Title</label>
                              <input
                                type="text"
                                value={formData.fdfCard?.title || ''}
                                onChange={(e) => handleInputChange('fdfCard', { ...formData.fdfCard, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                              <input
                                type="text"
                                value={formData.fdfCard?.subtitle || ''}
                                onChange={(e) => handleInputChange('fdfCard', { ...formData.fdfCard, subtitle: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Remix Icon class)</label>
                              <input
                                type="text"
                                value={formData.fdfCard?.icon || ''}
                                onChange={(e) => handleInputChange('fdfCard', { ...formData.fdfCard, icon: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., ri-capsule-line"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Color (Hex)</label>
                              <input
                                type="text"
                                value={formData.fdfCard?.color || ''}
                                onChange={(e) => handleInputChange('fdfCard', { ...formData.fdfCard, color: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="#7dc244"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                              <div className="space-y-3">
                                {(formData.fdfCard?.points || []).map((point: any, index: number) => (
                                  <div key={index} className="flex gap-2 items-start">
                                    <div className="flex-1">
                                      <input
                                        type="text"
                                        value={point.title || ''}
                                        onChange={(e) => {
                                          const newPoints = [...(formData.fdfCard?.points || [])];
                                          newPoints[index] = { ...newPoints[index], title: e.target.value };
                                          handleInputChange('fdfCard', { ...formData.fdfCard, points: newPoints });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        placeholder="Point title"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <input
                                        type="text"
                                        value={point.description || ''}
                                        onChange={(e) => {
                                          const newPoints = [...(formData.fdfCard?.points || [])];
                                          newPoints[index] = { ...newPoints[index], description: e.target.value };
                                          handleInputChange('fdfCard', { ...formData.fdfCard, points: newPoints });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        placeholder="Point description"
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newPoints = (formData.fdfCard?.points || []).filter((_: any, i: number) => i !== index);
                                        handleInputChange('fdfCard', { ...formData.fdfCard, points: newPoints });
                                      }}
                                      className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                                    >
                                      <i className="ri-delete-bin-line"></i>
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newPoints = [...(formData.fdfCard?.points || []), { title: '', description: '' }];
                                    handleInputChange('fdfCard', { ...formData.fdfCard, points: newPoints });
                                  }}
                                  className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium"
                                >
                                  <i className="ri-add-line mr-2"></i>
                                  Add Point
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Promise Section */}
                        <div className="pb-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">R&D Promise Section</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Promise Title</label>
                              <input
                                type="text"
                                value={formData.promise?.title || ''}
                                onChange={(e) => handleInputChange('promise', { ...formData.promise, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Promise Description</label>
                              <textarea
                                value={formData.promise?.description || ''}
                                onChange={(e) => handleInputChange('promise', { ...formData.promise, description: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={3}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Remix Icon class)</label>
                              <input
                                type="text"
                                value={formData.promise?.icon || ''}
                                onChange={(e) => handleInputChange('promise', { ...formData.promise, icon: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., ri-lightbulb-line"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive ?? true}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">Active</label>
                        </div>
                      </>
                    )}

                    {/* Generic Form Fields - Only show for facilities */}
                    {editingItem && !['capabilities-hero', 'capabilities-research'].includes(editingItem) && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            value={formData.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                            <select
                              value={formData.type || 'API Manufacturing'}
                              onChange={(e) => handleInputChange('type', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option>API Manufacturing</option>
                              <option>Oncology & Specialty Intermediates</option>
                              <option>Formulations & Complex Generics</option>
                              <option>Packaging & Customization</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Established</label>
                            <input
                              type="text"
                              value={formData.established || ''}
                              onChange={(e) => handleInputChange('established', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <input
                              type="text"
                              value={formData.location || ''}
                              onChange={(e) => handleInputChange('location', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                            <input
                              type="text"
                              value={formData.capacity || ''}
                              onChange={(e) => handleInputChange('capacity', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('image', url);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {formData.image && (
                            <div className="mt-2">
                              <img src={formData.image} alt="Preview" className="w-32 h-20 object-cover rounded" />
                              <p className="text-xs text-gray-500 mt-1">Current: {formData.image}</p>
                            </div>
                          )}
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Capabilities</label>
                          <div className="space-y-2">
                            {(Array.isArray(formData.capabilities) && formData.capabilities.length > 0 ? formData.capabilities : ['']).map((cap: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={cap}
                                  onChange={(e) => setFormData((prev: any) => {
                                    const next = Array.isArray(prev.capabilities) ? [...prev.capabilities] : [];
                                    next[idx] = e.target.value;
                                    return { ...prev, capabilities: next };
                                  })}
                                  placeholder="e.g., High-vacuum distillation"
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                  type="button"
                                  onClick={() => setFormData((prev: any) => {
                                    const next = (Array.isArray(prev.capabilities) ? [...prev.capabilities] : []);
                                    next.splice(idx, 1);
                                    return { ...prev, capabilities: next.length ? next : [''] };
                                  })}
                                  className="px-2 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                                  title="Remove"
                                >
                                  <i className="ri-delete-bin-6-line"></i>
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => setFormData((prev: any) => ({ ...prev, capabilities: [...(prev.capabilities || []), ''] }))}
                              className="mt-1 inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-sm"
                            >
                              <i className="ri-add-line mr-1"></i>
                              Add Capability
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Approval Logos (URLs)</label>
                          <div className="space-y-2">
                            {(Array.isArray(formData.approvals) && formData.approvals.length > 0 ? formData.approvals : ['']).map((url: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={url}
                                  onChange={(e) => setFormData((prev: any) => {
                                    const next = Array.isArray(prev.approvals) ? [...prev.approvals] : [];
                                    next[idx] = e.target.value;
                                    return { ...prev, approvals: next };
                                  })}
                                  placeholder="https://example.com/logo.png"
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                  type="button"
                                  onClick={() => setFormData((prev: any) => {
                                    const next = (Array.isArray(prev.approvals) ? [...prev.approvals] : []);
                                    next.splice(idx, 1);
                                    return { ...prev, approvals: next.length ? next : [''] };
                                  })}
                                  className="px-2 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                                  title="Remove"
                                >
                                  <i className="ri-delete-bin-6-line"></i>
                                </button>

                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => setFormData((prev: any) => ({ ...prev, approvals: [...(prev.approvals || []), ''] }))}
                              className="mt-1 inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-sm"
                            >
                              <i className="ri-add-line mr-1"></i>
                              Add Logo
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                            <select
                              value={formData.color || 'refex-blue'}
                              onChange={(e) => handleInputChange('color', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="refex-blue">refex-blue</option>
                              <option value="refex-green">refex-green</option>
                              <option value="refex-orange">refex-orange</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                            <input
                              type="number"
                              value={formData.order || 1}
                              onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="flex items-center mt-7">
                            <input
                              type="checkbox"
                              id="isActive"
                              checked={formData.isActive ?? true}
                              onChange={(e) => handleInputChange('isActive', e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">Active</label>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Portable X-Ray Page Forms */}
                    {activeTab === 'portable-xray-page' && (
                      <>
                        {/* Portable X-Ray Overview Form */}
                        {editingItem === 'portable-xray-overview' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                              <input
                                type="text"
                                value={formData.title || ''}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                              <textarea
                                value={formData.description || ''}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={6}
                              />
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="portableXRayOverviewIsActive"
                                checked={formData.isActive ?? true}
                                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                                className="mr-2"
                              />
                              <label htmlFor="portableXRayOverviewIsActive" className="text-sm font-medium text-gray-700">Active</label>
                            </div>
                          </>
                        )}

                        {/* Portable X-Ray Feature Form */}
                        {(editingItem === 'portable-xray-feature' || (typeof editingItem === 'object' && editingItem?.type === 'portable-xray-feature')) && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                              <input
                                type="text"
                                value={formData.title || ''}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                              <textarea
                                value={formData.description || ''}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={4}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Icon (RemixIcon class name)</label>
                              <input
                                type="text"
                                value={formData.icon || ''}
                                onChange={(e) => handleInputChange('icon', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="ri-star-line"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                                <input
                                  type="number"
                                  value={formData.order || 0}
                                  onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  min="0"
                                />
                              </div>
                              <div className="flex items-center mt-7">
                                <input
                                  type="checkbox"
                                  id="portableXRayFeatureIsActive"
                                  checked={formData.isActive ?? true}
                                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                                  className="mr-2"
                                />
                                <label htmlFor="portableXRayFeatureIsActive" className="text-sm font-medium text-gray-700">Active</label>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Portable X-Ray Specification Form */}
                        {(editingItem === 'portable-xray-specification' || (typeof editingItem === 'object' && editingItem?.type === 'portable-xray-specification')) && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                              <input
                                type="text"
                                value={formData.name || ''}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                              <input
                                type="text"
                                value={formData.value || ''}
                                onChange={(e) => handleInputChange('value', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                                <input
                                  type="number"
                                  value={formData.order || 0}
                                  onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  min="0"
                                />
                              </div>
                              <div className="flex items-center mt-7">
                                <input
                                  type="checkbox"
                                  id="portableXRaySpecificationIsActive"
                                  checked={formData.isActive ?? true}
                                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                                  className="mr-2"
                                />
                                <label htmlFor="portableXRaySpecificationIsActive" className="text-sm font-medium text-gray-700">Active</label>
                              </div>
                            </div>
                          </>
                        )}




                      </>
                    )}

                    {/* Radiography Page Forms */}
                    {activeTab === 'radiography-page' && (
                      <>
                        {/* Radiography Hero Form */}
                        {editingItem === 'radiography-hero' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                              <input
                                type="text"
                                value={formData.title || ''}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Radiography Systems"
                                required
                              />
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="radiographyHeroIsActive"
                                checked={formData.isActive ?? true}
                                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                                className="mr-2"
                              />
                              <label htmlFor="radiographyHeroIsActive" className="text-sm font-medium text-gray-700">Active</label>
                            </div>
                          </>
                        )}

                      </>
                    )}

                    {/* Flat Panel Page Forms */}
                    {activeTab === 'flat-panel-page' && (
                      <>
                        {/* Flat Panel Hero Form */}
                        {editingItem === 'flat-panel-hero' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                              <input
                                type="text"
                                value={formData.title || ''}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Flat Panel Detectors"
                                required
                              />
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="flatPanelHeroIsActive"
                                checked={formData.isActive ?? true}
                                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                                className="mr-2"
                              />
                              <label htmlFor="flatPanelHeroIsActive" className="text-sm font-medium text-gray-700">Active</label>
                            </div>
                          </>
                        )}

                      </>
                    )}

                    {/* Mammography Page Forms */}
                    {activeTab === 'mammography-page' && (
                      <>
                        {/* Mammography Hero Form */}
                        {editingItem === 'mammography-hero' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                              <input
                                type="text"
                                value={formData.title || ''}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Mammography Systems"
                                required
                              />
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="mammographyHeroIsActive"
                                checked={formData.isActive ?? true}
                                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                                className="mr-2"
                              />
                              <label htmlFor="mammographyHeroIsActive" className="text-sm font-medium text-gray-700">Active</label>
                            </div>
                          </>
                        )}

                        {/* Mammography Product Form */}
                        {(editingItem === 'mammography-product' || (typeof editingItem === 'object' && editingItem?.type === 'mammography-product')) && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                              <input
                                type="text"
                                value={formData.title || ''}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Overview</label>
                              <textarea
                                value={formData.overview || ''}
                                onChange={(e) => handleInputChange('overview', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={3}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                              <textarea
                                value={typeof formData.features === 'string' ? formData.features : (Array.isArray(formData.features) ? formData.features.join('\n') : '')}
                                onChange={(e) => handleInputChange('features', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={4}
                                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                              />
                              <p className="text-xs text-gray-500 mt-1">Enter one feature per line. They will be converted to a list.</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                              <textarea
                                value={formData.benefits || ''}
                                onChange={(e) => handleInputChange('benefits', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={3}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                              <input
                                type="text"
                                value={formData.image || ''}
                                onChange={(e) => handleInputChange('image', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                                placeholder="/assets/images/products/..."
                              />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const url = await uploadImage(file);
                                    if (url) handleInputChange('image', url);
                                  }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              {formData.image && (
                                <div className="mt-2">
                                  <img src={formData.image} alt="Preview" className="w-full h-40 object-cover rounded" />
                                </div>
                              )}
                              {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Section ID (for hash navigation)</label>
                              <input
                                type="text"
                                value={formData.sectionId || ''}
                                onChange={(e) => handleInputChange('sectionId', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="pinkviewdrplus"
                              />
                              <p className="text-xs text-gray-500 mt-1">Lowercase, no spaces. Used for URL hash navigation.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image Position</label>
                                <select
                                  value={formData.imagePosition || 'left'}
                                  onChange={(e) => handleInputChange('imagePosition', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  <option value="left">Left</option>
                                  <option value="right">Right</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                                <select
                                  value={formData.backgroundColor || 'from-gray-50 to-white'}
                                  onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  <option value="from-gray-50 to-white">Gray to White</option>
                                  <option value="from-white to-gray-50">White to Gray</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                              <input
                                type="number"
                                value={formData.order || 0}
                                onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                min="0"
                              />
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="mammographyProductIsActive"
                                checked={formData.isActive ?? true}
                                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                                className="mr-2"
                              />
                              <label htmlFor="mammographyProductIsActive" className="text-sm font-medium text-gray-700">Active</label>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* Refurbished MRI Page Forms */}
                    {activeTab === 'mri-page' && (
                      <>
                        {/* Refurbished MRI Hero Form */}
                        {editingItem === 'refurbished-mri-hero' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                              <input
                                type="text"
                                value={formData.title || ''}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Refurbished MRI Systems"
                                required
                              />
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="refurbishedMRIHeroIsActive"
                                checked={formData.isActive ?? true}
                                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                                className="mr-2"
                              />
                              <label htmlFor="refurbishedMRIHeroIsActive" className="text-sm font-medium text-gray-700">Active</label>
                            </div>
                          </>
                        )}

                      </>
                    )}

                    {/* Imaging Accessories Page Forms */}
                    {activeTab === 'imaging-accessories-page' && (
                      <>
                        {/* Imaging Accessories Hero Form */}
                        {editingItem === 'imaging-accessories-hero' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                              <input
                                type="text"
                                value={formData.title || ''}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                              <input
                                type="text"
                                value={formData.subtitle || ''}
                                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                              <textarea
                                value={formData.description || ''}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={4}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const url = await uploadImage(file);
                                    if (url) handleInputChange('backgroundImage', url);
                                  }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              {formData.backgroundImage && (
                                <div className="mt-2">
                                  <img src={formData.backgroundImage} alt="Preview" className="w-32 h-20 object-cover rounded" />
                                </div>
                              )}
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="isActive"
                                checked={formData.isActive ?? true}
                                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                                Active
                              </label>
                            </div>
                          </>
                        )}

                      </>
                    )}

                    {/* Search Results Page Forms */}
                    {activeTab === 'search-results-page' && (
                      <>
                        {/* Search Result Form */}
                        {(editingItem === 'search-result' || (typeof editingItem === 'object' && editingItem?.type === 'search-result')) && (
                          <SearchResultsForm
                            formData={formData}
                            handleInputChange={handleInputChange}
                          />
                        )}
                      </>
                    )}


                    {/* Contact Hero Form */}
                    {editingItem === 'contact-hero' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle (optional)</label>
                          <input
                            type="text"
                            value={formData.subtitle || ''}
                            onChange={(e) => handleInputChange('subtitle', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={formData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                            placeholder="Main description text"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('backgroundImage', url);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {formData.backgroundImage && (
                            <div className="mt-2">
                              <img src={formData.backgroundImage} alt="Preview" className="w-32 h-20 object-cover rounded" />
                              <p className="text-xs text-gray-500 mt-1">Current: {formData.backgroundImage}</p>
                            </div>
                          )}
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                      </>
                    )}



                    {/* Contact User Form */}
                    {editingItem === 'contact-user' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            value={formData.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <input
                            type="tel"
                            value={formData.phone || ''}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                          <input
                            type="text"
                            value={formData.department || ''}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                          <input
                            type="text"
                            value={formData.position || ''}
                            onChange={(e) => handleInputChange('position', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
                          <input
                            type="url"
                            value={formData.avatar || ''}
                            onChange={(e) => handleInputChange('avatar', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://example.com/avatar.jpg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                          <input
                            type="number"
                            value={formData.order || 0}
                            onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="0"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive || false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                            Active
                          </label>
                        </div>
                      </>
                    )}

                    {/* Home Global Impact Form */}
                    {editingItem === 'home-global-impact' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={formData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                            placeholder="Section description text"
                            required
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive || false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                            Active
                          </label>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* Header & Footer Forms */}
                {(editingItem === 'header' || editingItem === 'footer') && (
                  <>
                    {/* Header Form */}
                    {editingItem === 'header' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                          <input
                            type="text"
                            value={formData.logo || ''}
                            onChange={(e) => handleInputChange('logo', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="/assets/images/logos/logo.png"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('logo', url);
                              }
                            }}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <div className="mt-3">
                            {formData.logo ? (
                              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-500 mb-2 font-medium">Logo Preview:</p>
                                <img
                                  src={formData.logo}
                                  alt="Logo Preview"
                                  className="h-12 w-auto object-contain rounded border border-gray-300 shadow-sm bg-white p-2"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="50"%3E%3Crect fill="%23f3f4f6" width="200" height="50"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="12"%3EImage not found%3C/text%3E%3C/svg%3E';
                                  }}
                                />
                              </div>
                            ) : (
                              <p className="text-xs text-gray-400 italic">No logo URL provided. Enter a URL above to see preview.</p>
                            )}
                          </div>
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="text"
                            value={formData.phone || ''}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="+91 94440 26307"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Icon URL</label>
                          <input
                            type="text"
                            value={formData.phoneIcon || ''}
                            onChange={(e) => handleInputChange('phoneIcon', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="/assets/images/icons/phone-icon.png"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('phoneIcon', url);
                              }
                            }}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <div className="mt-3">
                            {formData.phoneIcon ? (
                              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-500 mb-2 font-medium">Phone Icon Preview:</p>
                                <img
                                  src={formData.phoneIcon}
                                  alt="Phone Icon Preview"
                                  className="w-10 h-10 object-contain rounded border border-gray-300 shadow-sm bg-white p-1"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40"%3E%3Crect fill="%23f3f4f6" width="40" height="40"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="10"%3ENot found%3C/text%3E%3C/svg%3E';
                                  }}
                                />
                              </div>
                            ) : (
                              <p className="text-xs text-gray-400 italic">No phone icon URL provided. Enter a URL above to see preview.</p>
                            )}
                          </div>
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email (optional)</label>
                          <input
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="info@3imedtech.com"
                          />
                        </div>
                        <NavigationLinksManager
                          navigationLinks={Array.isArray(formData.navigationLinks) 
                            ? formData.navigationLinks 
                            : (formData.navigationLinks 
                              ? (typeof formData.navigationLinks === 'string' 
                                ? JSON.parse(formData.navigationLinks) 
                                : formData.navigationLinks) 
                              : [])}
                          onUpdate={(links) => handleInputChange('navigationLinks', links)}
                        />
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="headerIsActive"
                            checked={formData.isActive !== false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="headerIsActive" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                      </>
                    )}

                    {/* Footer Form */}
                    {editingItem === 'footer' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                          <input
                            type="text"
                            value={formData.logo || ''}
                            onChange={(e) => handleInputChange('logo', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="/assets/images/logos/logo-footer.png"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadImage(file);
                                if (url) handleInputChange('logo', url);
                              }
                            }}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <div className="mt-3">
                            {formData.logo ? (
                              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-500 mb-2 font-medium">Footer Logo Preview:</p>
                                <img
                                  src={formData.logo}
                                  alt="Footer Logo Preview"
                                  className="h-16 w-auto object-contain rounded border border-gray-300 shadow-sm bg-white p-2"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150"%3E%3Crect fill="%23f3f4f6" width="150" height="150"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="12"%3EImage not found%3C/text%3E%3C/svg%3E';
                                  }}
                                />
                              </div>
                            ) : (
                              <p className="text-xs text-gray-400 italic">No logo URL provided. Enter a URL above to see preview.</p>
                            )}
                          </div>
                          {uploadingImage && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Registered Office Address</label>
                          <textarea
                            value={formData.registeredOffice || ''}
                            onChange={(e) => handleInputChange('registeredOffice', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                            placeholder="Second Floor, Refex Towers, Sterling Road Signal, 313, Valluvar Kottam High Road, Nungambakkam, Chennai – 600034, Tamil Nadu"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Corporate Office Address</label>
                          <textarea
                            value={formData.corporateOffice || ''}
                            onChange={(e) => handleInputChange('corporateOffice', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                            placeholder="Refex Building, 67, Bazullah Road, Parthasarathy Puram, T Nagar, Chennai – 600017"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="text"
                            value={formData.phone || ''}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="+91 94440 26307"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <input
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="info@3imedtech.com"
                          />
                        </div>
                        {/* About 3i MedTech Section */}
                        <div className="mb-6 p-5 border-2 border-blue-200 rounded-lg bg-blue-50">
                          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <i className="ri-information-line text-blue-600"></i>
                            About 3i MedTech Section
                          </h3>
                          {(() => {
                            const navColumns = Array.isArray(formData.navigationColumns)
                              ? formData.navigationColumns
                              : (typeof formData.navigationColumns === 'string'
                                ? JSON.parse(formData.navigationColumns || '[]')
                                : []);
                            const aboutColumn = navColumns.find((col: any) => col.title === 'About 3i MedTech') || { title: 'About 3i MedTech', links: [], order: 1 };
                            const aboutColumnIdx = navColumns.findIndex((col: any) => col.title === 'About 3i MedTech');

                            return (
                              <div>
                                <div className="space-y-3 mb-4">
                                  {aboutColumn.links?.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)).map((link: any, linkIdx: number) => {
                                    const sortedLinks = aboutColumn.links?.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) || [];
                                    const actualIndex = sortedLinks.findIndex((l: any) => l === link);

                                    return (
                                      <div key={linkIdx} className="bg-white p-3 rounded border border-gray-300 flex items-center gap-3 cursor-move hover:shadow-md transition-shadow" draggable onDragStart={(e) => {
                                        e.dataTransfer.setData('text/plain', JSON.stringify({ colIdx: aboutColumnIdx, linkIdx: actualIndex, colTitle: 'About 3i MedTech' }));
                                      }} onDragOver={(e) => {
                                        e.preventDefault();
                                        e.currentTarget.classList.add('border-blue-400');
                                      }} onDragLeave={(e) => {
                                        e.currentTarget.classList.remove('border-blue-400');
                                      }} onDrop={(e) => {
                                        e.preventDefault();
                                        e.currentTarget.classList.remove('border-blue-400');
                                        try {
                                          const dragged = JSON.parse(e.dataTransfer.getData('text/plain'));
                                          if (dragged.colTitle === 'About 3i MedTech' && dragged.linkIdx !== actualIndex) {
                                            const links = [...sortedLinks];
                                            const [removed] = links.splice(dragged.linkIdx, 1);
                                            links.splice(actualIndex, 0, removed);
                                            links.forEach((l: any, idx: number) => l.order = idx + 1);
                                            const updated = navColumns.map((col: any, cIdx: number) =>
                                              cIdx === aboutColumnIdx ? { ...col, links } : col
                                            );
                                            if (aboutColumnIdx === -1) {
                                              updated.push({ ...aboutColumn, links });
                                            }
                                            handleInputChange('navigationColumns', updated);
                                          }
                                        } catch (err) {
                                          console.error('Drag error:', err);
                                        }
                                      }}>
                                        <i className="ri-drag-move-2-line text-gray-400 text-lg"></i>
                                        <input
                                          type="number"
                                          value={link.order || linkIdx + 1}
                                          onChange={(e) => {
                                            const links = aboutColumn.links.map((l: any, lIdx: number) =>
                                              lIdx === linkIdx ? { ...l, order: parseInt(e.target.value) || 0 } : l
                                            );
                                            const updated = navColumns.map((col: any, cIdx: number) =>
                                              cIdx === aboutColumnIdx ? { ...col, links } : (aboutColumnIdx === -1 && cIdx === navColumns.length ? { ...aboutColumn, links } : col)
                                            );
                                            if (aboutColumnIdx === -1) updated.push({ ...aboutColumn, links });
                                            handleInputChange('navigationColumns', updated);
                                          }}
                                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                                          placeholder="Order"
                                        />
                                        <input
                                          type="text"
                                          value={link.label || ''}
                                          onChange={(e) => {
                                            const links = aboutColumn.links.map((l: any, lIdx: number) =>
                                              lIdx === linkIdx ? { ...l, label: e.target.value } : l
                                            );
                                            const updated = navColumns.map((col: any, cIdx: number) =>
                                              cIdx === aboutColumnIdx ? { ...col, links } : (aboutColumnIdx === -1 && cIdx === navColumns.length ? { ...aboutColumn, links } : col)
                                            );
                                            if (aboutColumnIdx === -1) updated.push({ ...aboutColumn, links });
                                            handleInputChange('navigationColumns', updated);
                                          }}
                                          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                                          placeholder="Link Name (e.g., About)"
                                        />
                                        <input
                                          type="text"
                                          value={link.link || ''}
                                          onChange={(e) => {
                                            const links = aboutColumn.links.map((l: any, lIdx: number) =>
                                              lIdx === linkIdx ? { ...l, link: e.target.value } : l
                                            );
                                            const updated = navColumns.map((col: any, cIdx: number) =>
                                              cIdx === aboutColumnIdx ? { ...col, links } : (aboutColumnIdx === -1 && cIdx === navColumns.length ? { ...aboutColumn, links } : col)
                                            );
                                            if (aboutColumnIdx === -1) updated.push({ ...aboutColumn, links });
                                            handleInputChange('navigationColumns', updated);
                                          }}
                                          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                                          placeholder="Redirect Link (e.g., /about or https://example.com)"
                                        />
                                        <label className="flex items-center gap-1 text-sm text-gray-700 whitespace-nowrap">
                                          <input
                                            type="checkbox"
                                            checked={link.external || false}
                                            onChange={(e) => {
                                              const links = aboutColumn.links.map((l: any, lIdx: number) =>
                                                lIdx === linkIdx ? { ...l, external: e.target.checked } : l
                                              );
                                              const updated = navColumns.map((col: any, cIdx: number) =>
                                                cIdx === aboutColumnIdx ? { ...col, links } : (aboutColumnIdx === -1 && cIdx === navColumns.length ? { ...aboutColumn, links } : col)
                                              );
                                              if (aboutColumnIdx === -1) updated.push({ ...aboutColumn, links });
                                              handleInputChange('navigationColumns', updated);
                                            }}
                                            className="mr-1"
                                          />
                                          External
                                        </label>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const links = aboutColumn.links.filter((_: any, lIdx: number) => lIdx !== linkIdx);
                                            const updated = navColumns.map((col: any, cIdx: number) =>
                                              cIdx === aboutColumnIdx ? { ...col, links } : col
                                            );
                                            if (aboutColumnIdx === -1) {
                                              if (links.length > 0) updated.push({ ...aboutColumn, links });
                                            }
                                            handleInputChange('navigationColumns', updated);
                                          }}
                                          className="text-red-500 hover:text-red-700 p-1"
                                        >
                                          <i className="ri-delete-bin-line text-lg"></i>
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newLink = {
                                      label: '',
                                      link: '',
                                      order: (aboutColumn.links?.length || 0) + 1,
                                      external: false
                                    };
                                    const links = [...(aboutColumn.links || []), newLink];
                                    const updated = navColumns.map((col: any, cIdx: number) =>
                                      cIdx === aboutColumnIdx ? { ...col, links } : col
                                    );
                                    if (aboutColumnIdx === -1) {
                                      updated.push({ ...aboutColumn, links });
                                    }
                                    handleInputChange('navigationColumns', updated);
                                  }}
                                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                >
                                  <i className="ri-add-line mr-1"></i>Add Link to About 3i MedTech
                                </button>
                              </div>
                            );
                          })()}
                        </div>

                        {/* Know More Section */}
                        <div className="mb-6 p-5 border-2 border-green-200 rounded-lg bg-green-50">
                          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <i className="ri-links-line text-green-600"></i>
                            Know More Section
                          </h3>
                          {(() => {
                            const navColumns = Array.isArray(formData.navigationColumns)
                              ? formData.navigationColumns
                              : (typeof formData.navigationColumns === 'string'
                                ? JSON.parse(formData.navigationColumns || '[]')
                                : []);
                            const knowMoreColumn = navColumns.find((col: any) => col.title === 'Know More') || { title: 'Know More', links: [], order: 2 };
                            const knowMoreColumnIdx = navColumns.findIndex((col: any) => col.title === 'Know More');

                            return (
                              <div>
                                <div className="space-y-3 mb-4">
                                  {knowMoreColumn.links?.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)).map((link: any, linkIdx: number) => {
                                    const sortedLinks = knowMoreColumn.links?.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) || [];
                                    const actualIndex = sortedLinks.findIndex((l: any) => l === link);

                                    return (
                                      <div key={linkIdx} className="bg-white p-3 rounded border border-gray-300 flex items-center gap-3 cursor-move hover:shadow-md transition-shadow" draggable onDragStart={(e) => {
                                        e.dataTransfer.setData('text/plain', JSON.stringify({ colIdx: knowMoreColumnIdx, linkIdx: actualIndex, colTitle: 'Know More' }));
                                      }} onDragOver={(e) => {
                                        e.preventDefault();
                                        e.currentTarget.classList.add('border-green-400');
                                      }} onDragLeave={(e) => {
                                        e.currentTarget.classList.remove('border-green-400');
                                      }} onDrop={(e) => {
                                        e.preventDefault();
                                        e.currentTarget.classList.remove('border-green-400');
                                        try {
                                          const dragged = JSON.parse(e.dataTransfer.getData('text/plain'));
                                          if (dragged.colTitle === 'Know More' && dragged.linkIdx !== actualIndex) {
                                            const links = [...sortedLinks];
                                            const [removed] = links.splice(dragged.linkIdx, 1);
                                            links.splice(actualIndex, 0, removed);
                                            links.forEach((l: any, idx: number) => l.order = idx + 1);
                                            const updated = navColumns.map((col: any, cIdx: number) =>
                                              cIdx === knowMoreColumnIdx ? { ...col, links } : col
                                            );
                                            if (knowMoreColumnIdx === -1) {
                                              updated.push({ ...knowMoreColumn, links });
                                            }
                                            handleInputChange('navigationColumns', updated);
                                          }
                                        } catch (err) {
                                          console.error('Drag error:', err);
                                        }
                                      }}>
                                        <i className="ri-drag-move-2-line text-gray-400 text-lg"></i>
                                        <input
                                          type="number"
                                          value={link.order || linkIdx + 1}
                                          onChange={(e) => {
                                            const links = knowMoreColumn.links.map((l: any, lIdx: number) =>
                                              lIdx === linkIdx ? { ...l, order: parseInt(e.target.value) || 0 } : l
                                            );
                                            const updated = navColumns.map((col: any, cIdx: number) =>
                                              cIdx === knowMoreColumnIdx ? { ...col, links } : (knowMoreColumnIdx === -1 && cIdx === navColumns.length ? { ...knowMoreColumn, links } : col)
                                            );
                                            if (knowMoreColumnIdx === -1) updated.push({ ...knowMoreColumn, links });
                                            handleInputChange('navigationColumns', updated);
                                          }}
                                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                                          placeholder="Order"
                                        />
                                        <input
                                          type="text"
                                          value={link.label || ''}
                                          onChange={(e) => {
                                            const links = knowMoreColumn.links.map((l: any, lIdx: number) =>
                                              lIdx === linkIdx ? { ...l, label: e.target.value } : l
                                            );
                                            const updated = navColumns.map((col: any, cIdx: number) =>
                                              cIdx === knowMoreColumnIdx ? { ...col, links } : (knowMoreColumnIdx === -1 && cIdx === navColumns.length ? { ...knowMoreColumn, links } : col)
                                            );
                                            if (knowMoreColumnIdx === -1) updated.push({ ...knowMoreColumn, links });
                                            handleInputChange('navigationColumns', updated);
                                          }}
                                          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                                          placeholder="Link Name (e.g., Radiography Systems)"
                                        />
                                        <input
                                          type="text"
                                          value={link.link || ''}
                                          onChange={(e) => {
                                            const links = knowMoreColumn.links.map((l: any, lIdx: number) =>
                                              lIdx === linkIdx ? { ...l, link: e.target.value } : l
                                            );
                                            const updated = navColumns.map((col: any, cIdx: number) =>
                                              cIdx === knowMoreColumnIdx ? { ...col, links } : (knowMoreColumnIdx === -1 && cIdx === navColumns.length ? { ...knowMoreColumn, links } : col)
                                            );
                                            if (knowMoreColumnIdx === -1) updated.push({ ...knowMoreColumn, links });
                                            handleInputChange('navigationColumns', updated);
                                          }}
                                          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                                          placeholder="Redirect Link (e.g., /radiography-systems or https://example.com)"
                                        />
                                        <label className="flex items-center gap-1 text-sm text-gray-700 whitespace-nowrap">
                                          <input
                                            type="checkbox"
                                            checked={link.external || false}
                                            onChange={(e) => {
                                              const links = knowMoreColumn.links.map((l: any, lIdx: number) =>
                                                lIdx === linkIdx ? { ...l, external: e.target.checked } : l
                                              );
                                              const updated = navColumns.map((col: any, cIdx: number) =>
                                                cIdx === knowMoreColumnIdx ? { ...col, links } : (knowMoreColumnIdx === -1 && cIdx === navColumns.length ? { ...knowMoreColumn, links } : col)
                                              );
                                              if (knowMoreColumnIdx === -1) updated.push({ ...knowMoreColumn, links });
                                              handleInputChange('navigationColumns', updated);
                                            }}
                                            className="mr-1"
                                          />
                                          External
                                        </label>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const links = knowMoreColumn.links.filter((_: any, lIdx: number) => lIdx !== linkIdx);
                                            const updated = navColumns.map((col: any, cIdx: number) =>
                                              cIdx === knowMoreColumnIdx ? { ...col, links } : col
                                            );
                                            if (knowMoreColumnIdx === -1) {
                                              if (links.length > 0) updated.push({ ...knowMoreColumn, links });
                                            }
                                            handleInputChange('navigationColumns', updated);
                                          }}
                                          className="text-red-500 hover:text-red-700 p-1"
                                        >
                                          <i className="ri-delete-bin-line text-lg"></i>
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newLink = {
                                      label: '',
                                      link: '',
                                      order: (knowMoreColumn.links?.length || 0) + 1,
                                      external: false
                                    };
                                    const links = [...(knowMoreColumn.links || []), newLink];
                                    const updated = navColumns.map((col: any, cIdx: number) =>
                                      cIdx === knowMoreColumnIdx ? { ...col, links } : col
                                    );
                                    if (knowMoreColumnIdx === -1) {
                                      updated.push({ ...knowMoreColumn, links });
                                    }
                                    handleInputChange('navigationColumns', updated);
                                  }}
                                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                >
                                  <i className="ri-add-line mr-1"></i>Add Link to Know More
                                </button>
                              </div>
                            );
                          })()}
                        </div>

                        {/* Follow us on Section */}
                        <div className="mb-6 p-5 border-2 border-purple-200 rounded-lg bg-purple-50">
                          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <i className="ri-share-line text-purple-600"></i>
                            Follow us on Section
                          </h3>
                          <p className="text-xs text-gray-600 mb-4">Icons will display in rows of 4. Order determines position (1-4 = first row, 5-8 = second row, etc.)</p>
                          {(() => {
                            const socialLinks = Array.isArray(formData.socialLinks)
                              ? formData.socialLinks.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                              : (typeof formData.socialLinks === 'string'
                                ? JSON.parse(formData.socialLinks || '[]')
                                : []);

                            return (
                              <div>
                                <div className="space-y-3 mb-4">
                                  {socialLinks.map((social: any, idx: number) => {
                                    const rowNumber = Math.floor((social.order || idx + 1 - 1) / 5) + 1;
                                    const positionInRow = ((social.order || idx + 1 - 1) % 5) + 1;

                                    return (
                                      <div key={idx} className="bg-white p-4 rounded border border-gray-300">
                                        <div className="flex items-center gap-3 mb-3">
                                          <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500">Row:</span>
                                            <span className="text-sm font-semibold text-purple-600">{rowNumber}</span>
                                            <span className="text-xs text-gray-500">Position:</span>
                                            <span className="text-sm font-semibold text-purple-600">{positionInRow}</span>
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                          <div>
                                            <label className="block text-xs text-gray-600 mb-1">Order (1-5 = Row 1, 6-10 = Row 2, etc.)</label>
                                            <input
                                              type="number"
                                              value={social.order || idx + 1}
                                              onChange={(e) => {
                                                const updated = socialLinks.map((s: any, i: number) =>
                                                  i === idx ? { ...s, order: parseInt(e.target.value) || 0 } : s
                                                );
                                                handleInputChange('socialLinks', updated);
                                              }}
                                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                              placeholder="Order"
                                              min="1"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-xs text-gray-600 mb-1">Platform Name</label>
                                            <input
                                              type="text"
                                              value={social.platform || ''}
                                              onChange={(e) => {
                                                const updated = socialLinks.map((s: any, i: number) =>
                                                  i === idx ? { ...s, platform: e.target.value } : s
                                                );
                                                handleInputChange('socialLinks', updated);
                                              }}
                                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                              placeholder="Platform Name (e.g., LinkedIn)"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-xs text-gray-600 mb-1">Icon (Font Awesome class or Image URL)</label>
                                            <input
                                              type="text"
                                              value={social.icon || ''}
                                              onChange={(e) => {
                                                const updated = socialLinks.map((s: any, i: number) =>
                                                  i === idx ? { ...s, icon: e.target.value } : s
                                                );
                                                handleInputChange('socialLinks', updated);
                                              }}
                                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm mb-2"
                                              placeholder="fa-linkedin or /images/icons/linkedin.png"
                                            />
                                            <input
                                              type="file"
                                              accept="image/*"
                                              onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                  const url = await uploadImage(file);
                                                  if (url) {
                                                    const updated = socialLinks.map((s: any, i: number) =>
                                                      i === idx ? { ...s, icon: url } : s
                                                    );
                                                    handleInputChange('socialLinks', updated);
                                                  }
                                                }
                                              }}
                                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                            />
                                            {social.icon && (
                                              <div className="mt-2 p-2 bg-gray-50 rounded border">
                                                <p className="text-xs text-gray-500 mb-1">Icon Preview:</p>
                                                {social.icon.startsWith('fa-') || social.icon.startsWith('ri-') ? (
                                                  <i className={`${social.icon.startsWith('fa-') ? 'fa' : 'ri'} ${social.icon} text-2xl text-[#1E4C84]`}></i>
                                                ) : (
                                                  <img src={social.icon} alt="Icon" className="w-8 h-8 object-contain" onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32"%3E%3Crect fill="%23f3f4f6" width="32" height="32"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="10"%3ENot found%3C/text%3E%3C/svg%3E';
                                                  }} />
                                                )}
                                              </div>
                                            )}
                                          </div>
                                          <div>
                                            <label className="block text-xs text-gray-600 mb-1">Redirect Link (Social Media URL)</label>
                                            <input
                                              type="text"
                                              value={social.url || ''}
                                              onChange={(e) => {
                                                const updated = socialLinks.map((s: any, i: number) =>
                                                  i === idx ? { ...s, url: e.target.value } : s
                                                );
                                                handleInputChange('socialLinks', updated);
                                              }}
                                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                              placeholder="https://www.linkedin.com/company/..."
                                            />
                                          </div>
                                        </div>
                                        <div className="mt-3 flex justify-end">
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const updated = socialLinks.filter((_: any, i: number) => i !== idx);
                                              handleInputChange('socialLinks', updated);
                                            }}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                          >
                                            <i className="ri-delete-bin-line mr-1"></i>Delete
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const current = Array.isArray(formData.socialLinks)
                                      ? formData.socialLinks
                                      : (typeof formData.socialLinks === 'string'
                                        ? JSON.parse(formData.socialLinks || '[]')
                                        : []);
                                    const newSocial = {
                                      platform: '',
                                      url: '',
                                      icon: 'fa-link',
                                      order: (current.length || 0) + 1
                                    };
                                    handleInputChange('socialLinks', [...current, newSocial]);
                                  }}
                                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                >
                                  <i className="ri-add-line mr-1"></i>Add Social Media Link
                                </button>
                              </div>
                            );
                          })()}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
                          <input
                            type="text"
                            value={formData.copyright || ''}
                            onChange={(e) => handleInputChange('copyright', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Copyright © 2024 3i Medical Technologies"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="footerIsActive"
                            checked={formData.isActive !== false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="footerIsActive" className="text-sm font-medium text-gray-700">Active</label>
                        </div>
                      </>
                    )}
                  </>
                )}

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setImagePreview(null);
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('🔴 Update button clicked', { 
                        editingItem, 
                        activeTab,
                        formDataKeys: Object.keys(formData),
                        toEmail: formData.toEmail,
                        fromEmail: formData.fromEmail
                      });
                      // Explicitly invoke handleSubmit and await it
                      try {
                        await handleSubmit(e);
                      } catch (error) {
                        console.error('❌ Error in button onClick handler:', error);
                        showToast.error('An error occurred while saving. Please check the console.');
                      }
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? 'Uploading...' : (modalType === 'add' ? 'Add' : 'Update')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* About Mission Points Modal */}
      {aboutMpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{aboutMpMode === 'add' ? 'Add Mission Point' : 'Edit Mission Point'}</h3>
              <button onClick={closeAboutMpModal} className="text-gray-500 hover:text-gray-700">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={aboutMpForm.title}
                  onChange={(e) => setAboutMpForm({ ...aboutMpForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter mission point title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={aboutMpForm.description}
                  onChange={(e) => setAboutMpForm({ ...aboutMpForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Enter mission point description"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                  <input
                    type="number"
                    value={aboutMpForm.order}
                    onChange={(e) => setAboutMpForm({ ...aboutMpForm, order: Number(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={aboutMpForm.isActive}
                      onChange={(e) => setAboutMpForm({ ...aboutMpForm, isActive: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeAboutMpModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveAboutMpModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {aboutMpMode === 'add' ? 'Add' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Version History Modal */}
      {showVersions && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-xl font-semibold text-gray-800">
                Version History - {currentVersionSection?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h3>
              <button
                onClick={() => {
                  setShowVersions(false);
                  setVersions([]);
                  setCurrentVersionSection('');
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="p-6">
              {versions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No version history available.</p>
              ) : (
                <div className="space-y-4">
                  {versions.map((version: any, idx: number) => (
                    <div key={version.id || idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-semibold text-gray-800">Version {version.versionNumber}</span>
                          <span className="text-sm text-gray-500 ml-4">
                            {version.createdAt ? new Date(version.createdAt).toLocaleString() : 'Unknown date'}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRestoreVersion(version)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          <i className="ri-restart-line mr-2"></i>
                          Restore
                        </button>
                      </div>
                      {version.changeDescription && (
                        <p className="text-sm text-gray-600 mb-2">{version.changeDescription}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Deleted Items Modal */}
      {showDeletedItems && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-xl font-semibold text-gray-800">
                Deleted Items
              </h3>
              <button
                onClick={async () => {
                  setShowDeletedItems(false);
                  await fetchDeletedItems();
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="p-6">
              {deletedItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No deleted items found.</p>
              ) : (
                <div className="space-y-4">
                  {deletedItems.map((item: any, idx: number) => (
                    <div key={item.id || idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{item.title || item.label || `Item #${item.id}`}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Deleted: {item.deletedAt ? new Date(item.deletedAt).toLocaleString() : 'Unknown date'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRestoreDeletedItem(item, 'home-image-box')}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium ml-4"
                        >
                          <i className="ri-restart-line mr-2"></i>
                          Restore
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewMode && previewData && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-xl font-semibold text-gray-800">
                Live Preview - {previewSection?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h3>
              <button
                onClick={() => {
                  setPreviewMode(false);
                  setPreviewSection(null);
                  setPreviewData(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="p-6">
              {/* Home Hero Preview */}
              {previewSection === 'home-hero' && previewData && (
                <div className="relative h-96 bg-gradient-to-r from-blue-900 to-green-700 overflow-hidden rounded-lg">
                  {previewData.backgroundImage && (
                    <img
                      src={previewData.backgroundImage}
                      alt="Hero Background"
                      className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0066A1]/80 to-[#7AB730]/60"></div>
                  <div className="relative h-full flex items-center px-12">
                    <div className="max-w-2xl">
                      <h1 className="text-white text-5xl font-medium leading-tight mb-6">
                        {previewData.title || 'Affordable Diagnostic Imaging Solutions'}
                      </h1>
                      {previewData.badgeImage && (
                        <img
                          src={previewData.badgeImage}
                          alt="New Product Badge"
                          className="w-64 h-auto object-contain"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Home About Section Preview */}
              {previewSection === 'home-about-section' && previewData && (
                <div className="p-12 rounded-lg" style={{ backgroundColor: previewData.backgroundColor || '#1E4C84' }}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h6 className="text-[#7AB730] text-sm font-semibold uppercase tracking-wider mb-4">
                        {previewData.label || 'About Us'}
                      </h6>
                      <h3 className="text-4xl lg:text-5xl font-medium text-white mb-6 leading-tight">
                        {previewData.title || 'Your Partner for Clinically Relevant and Viable Imaging Technologies'}
                      </h3>
                    </div>
                    <div>
                      <p className="text-white text-lg leading-relaxed">
                        {previewData.description || 'Description will appear here...'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Home Image Boxes Preview */}
              {previewSection === 'home-image-boxes' && Array.isArray(previewData) && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {previewData
                      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                      .filter((box: any) => box.isActive !== false)
                      .map((box: any, idx: number) => (
                        <div key={box.id || idx} className="group relative overflow-hidden rounded-lg bg-[#E8F4F8] transition-all duration-500 hover:shadow-2xl">
                          <div className="relative h-64 overflow-hidden">
                            {box.image && (
                              <img
                                src={box.image}
                                alt={box.title || `Box ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            )}
                            <div className="absolute inset-0 bg-white/95 transition-all duration-500 group-hover:bg-transparent"></div>
                            <div className="absolute inset-0 flex flex-col justify-center p-6">
                              <h6 className="text-sm font-semibold uppercase tracking-wider mb-3 text-[#7AB730]">
                                {box.label || 'Label'}
                              </h6>
                              <h2 className="text-xl font-bold text-[#1E4C84] leading-tight">
                                {box.title || 'Title'}
                              </h2>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="text-center mt-6">
                    <p className="text-gray-700 text-lg">
                      Full-service provider of medical technology solutions.
                    </p>
                  </div>
                </div>
              )}

              {/* Home Commitment Preview */}
              {previewSection === 'home-commitment' && previewData && (
                <div className="p-12 rounded-lg" style={{ backgroundColor: previewData.backgroundColor || '#F9FAFB' }}>
                  <div className="text-center mb-12">
                    <h6 className="text-[#7AB730] text-sm font-semibold uppercase tracking-wider mb-4">
                      {previewData.label || 'Our Commitment'}
                    </h6>
                    <h3 className="text-4xl lg:text-5xl font-medium text-[#027C8E]">
                      {previewData.title || 'Redefining Healthcare Through Innovation'}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.isArray(previewData.cards) && previewData.cards
                      .filter((c: any) => c.isActive !== false)
                      .map((card: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-lg p-6 shadow-lg">
                          <div className="flex flex-col items-center text-center">
                            <h4 className="text-2xl font-bold text-[#027C8E] mb-4">{card.title || `Card ${idx + 1}`}</h4>
                            {card.icon && (
                              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                                <img src={card.icon} alt={card.title} className="w-full h-full object-contain" />
                              </div>
                            )}
                            <p className="text-gray-600 mb-4 leading-relaxed">
                              {card.description || 'Description will appear here...'}
                            </p>
                            {card.link && (
                              <a
                                href={card.link}
                                className="inline-flex items-center text-[#027C8E] hover:text-white hover:bg-[#E6662F] px-4 py-2 rounded font-medium transition-all duration-300"
                              >
                                {card.linkText || 'Learn More'} <i className="ri-arrow-right-line ml-2"></i>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Header Preview */}
              {previewSection === 'header' && previewData && (
                <div className="bg-white border-b border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 flex items-center justify-between">
                    {previewData.logo && (
                      <img src={previewData.logo} alt="Logo" className="h-12 w-auto" />
                    )}
                    <div className="flex items-center space-x-6">
                      <nav className="hidden md:flex space-x-4">
                        <a href="#" className="text-gray-700 hover:text-[#7AB730]">Home</a>
                        <a href="#" className="text-gray-700 hover:text-[#7AB730]">About</a>
                        <a href="#" className="text-gray-700 hover:text-[#7AB730]">Contact</a>
                      </nav>
                      {previewData.phone && (
                        <div className="text-sm">
                          <div className="text-gray-600">Have any questions?</div>
                          <a href={`tel:${previewData.phone}`} className="text-[#7AB730] font-semibold">{previewData.phone}</a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Preview */}
              {previewSection === 'footer' && previewData && (
                <div className="bg-white border-t border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {previewData.logo && (
                      <div>
                        <img src={previewData.logo} alt="Logo" className="h-16 w-auto mb-4" />
                        {previewData.registeredOffice && (
                          <p className="text-xs text-gray-600 mb-2">{previewData.registeredOffice}</p>
                        )}
                        {previewData.corporateOffice && (
                          <p className="text-xs text-gray-600">{previewData.corporateOffice}</p>
                        )}
                      </div>
                    )}
                    <div>
                      <h4 className="text-[#7AB730] font-bold mb-4">About 3i MedTech</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li><a href="#" className="hover:text-[#E6662F]">About</a></li>
                        <li><a href="#" className="hover:text-[#E6662F]">Mission & Vision</a></li>
                        <li><a href="#" className="hover:text-[#E6662F]">Why Choose Us</a></li>
                      </ul>
                    </div>
                    {previewData.phone && (
                      <div>
                        <p className="text-sm text-gray-700 mb-1">
                          <a href={`tel:${previewData.phone}`} className="text-[#027C8E] hover:text-[#E6662F]">{previewData.phone}</a>
                        </p>
                        {previewData.email && (
                          <p className="text-sm text-gray-700">
                            <a href={`mailto:${previewData.email}`} className="text-[#027C8E] hover:text-[#E6662F]">{previewData.email}</a>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  {previewData.copyright && (
                    <div className="border-t border-gray-200 py-4 text-center">
                      <p className="text-sm text-gray-600">{previewData.copyright}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
