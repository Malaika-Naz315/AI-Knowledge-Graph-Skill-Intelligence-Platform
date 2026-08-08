import { useEffect, useMemo, useState } from "react";

import {
  FaBoxOpen,
  FaLayerGroup,
  FaBuilding,
  FaDownload,
} from "react-icons/fa";

import { getProducts } from "../api/products";

import ProductTable from "../components/products/ProductTable";
import ProductSkeleton from "../components/products/ProductSkeleton";

import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatCard from "../components/common/StatCard";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";

import ViewModal from "../components/common/ViewModal";
import EditModal from "../components/common/EditModal";
import DeleteModal from "../components/common/DeleteModal";

import { exportProductsCSV } from "../utils/exportCSV";

function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal States

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const productsPerPage = 10;

  // ==========================
  // Fetch Products
  // ==========================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data = await getProducts();
        setProducts(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);

  // Reset page after search

  useEffect(() => {

    setCurrentPage(1);

  }, [search]);

  // ==========================
  // Search
  // ==========================

  const filteredProducts = useMemo(() => {

    return products.filter((product) =>

      `${product.name}
       ${product.description}
       ${product.owner_department}`

        .toLowerCase()

        .includes(search.toLowerCase())

    );

  }, [products, search]);

  // ==========================
  // Pagination
  // ==========================

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // ==========================
  // Statistics
  // ==========================

  const totalDepartments = new Set(
    products.map((product) => product.owner_department)
  ).size;

  // ==========================
  // Actions
  // ==========================

  const handleView = (product) => {
    setSelectedProduct(product);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleDelete = (product) => {
    setDeleteProduct(product);
  };

  const handleSave = (updatedProduct) => {

    setProducts((prev) =>
      prev.map((product) =>
        product.product_id === updatedProduct.product_id
          ? updatedProduct
          : product
      )
    );

    setEditProduct(null);

  };

  const handleConfirmDelete = (product) => {

    setProducts((prev) =>
      prev.filter(
        (item) => item.product_id !== product.product_id
      )
    );

    setDeleteProduct(null);

  };
    return (
    <div className="space-y-7">

      <PageHeader
        title="Products"
        subtitle="Explore products and solutions connected with the AI Knowledge Graph."
      />

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Products"
          value={products.length}
          icon={FaBoxOpen}
        />

        <StatCard
          title="Departments"
          value={totalDepartments}
          icon={FaBuilding}
        />

        <StatCard
          title="Showing"
          value={filteredProducts.length}
          icon={FaLayerGroup}
        />

        <StatCard
          title="Search Results"
          value={filteredProducts.length}
          icon={FaBoxOpen}
        />

      </div>

      {/* Search + Export */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between">

          <div className="flex-1">

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Search Products
            </label>

            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search products..."
            />

          </div>

          <Button
            variant="outline"
            icon={FaDownload}
            onClick={() => exportProductsCSV(filteredProducts)}
          >
            Export CSV
          </Button>

        </div>

      </div>

      {/* Table */}

      {loading ? (

        <ProductSkeleton />

      ) : paginatedProducts.length ? (

        <ProductTable
          products={paginatedProducts}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      ) : (

        <EmptyState
          title="No Products Found"
          description="No matching products available."
        />

      )}

      {/* Pagination */}

      {!loading && filteredProducts.length > 0 && (

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      )}

      {/* View Modal */}

      <ViewModal
        data={selectedProduct}
        title="Product Details"
        onClose={() => setSelectedProduct(null)}
      />

      {/* Edit Modal */}

      <EditModal
        data={editProduct}
        title="Edit Product"
        onClose={() => setEditProduct(null)}
        onSave={handleSave}
      />

      {/* Delete Modal */}

      <DeleteModal
        data={deleteProduct}
        title="Delete Product"
        onClose={() => setDeleteProduct(null)}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
}

export default Products;