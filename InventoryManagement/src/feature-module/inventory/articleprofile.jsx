import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter, Sliders,Package } from "react-feather";
import Select from "react-select";
import Swal from "sweetalert2";
import ImageWithBasePath from "../../core/img/imagewithbasebath";

import Breadcrumbs from "../../core/breadcrumbs";
import AuthService from "../../services/authService";

const ArticleProfile = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [glossaries, setGlossaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    glossary_ids: [],
    weight: "",
    dimensions: "",
    unit_: "piece",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    fetchArticles();
    fetchGlossaries();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.searchTerm = searchTerm;
      if (sortBy) params.sortBy = sortBy.value;

      const response = await AuthService.getArticles(params);
      setArticles(response.data.data || []);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch articles",
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchGlossaries = async () => {
    try {
      const response = await AuthService.getGlossaries();
      setGlossaries(response.data.glossaries || []);
    } catch (error) {
      console.error("Error fetching glossaries:", error);
    }
  };

  const handleSearch = () => {
    fetchArticles();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert glossary_ids array to JSON string for storage
      const submitData = {
        ...formData,
        glossary_ids: JSON.stringify(formData.glossary_ids),
        dimensions: formData.dimensions ? JSON.stringify(formData.dimensions) : null,
      };

      if (editingId) {
        await AuthService.updateArticleById(editingId, submitData);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Article updated successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await AuthService.createArticle(submitData);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Article created successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      }

      // Reset form
      resetForm();

      // Hide modal manually
      const modalId = editingId ? "edit-units" : "add-units";
      const modal = document.getElementById(modalId);
      const backdrop = document.querySelector(".modal-backdrop");

      if (modal) {
        modal.classList.remove("show");
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("padding-right");
      }

      if (backdrop) {
        backdrop.remove();
      }

      // Refresh articles
      fetchArticles();
    } catch (error) {
      console.error("Error saving article:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to save article",
        timer: 3000,
      });
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await AuthService.getArticleById(id);
      const articleData = response.data.data;
      
      // Parse JSON fields
      setFormData({
        ...articleData,
        glossary_ids: articleData.glossary_ids ? JSON.parse(articleData.glossary_ids) : [],
        dimensions: articleData.dimensions ? JSON.parse(articleData.dimensions) : "",
      });
      setEditingId(id);
    } catch (error) {
      console.error("Error fetching article:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch article details",
        timer: 2000,
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await AuthService.deleteArticle(id);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Article has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchArticles();
      } catch (error) {
        console.error("Error deleting article:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Failed to delete article",
          timer: 3000,
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      glossary_ids: [],
      weight: "",
      dimensions: "",
      unit_: "piece",
      description: "",
    });
    setEditingId(null);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(articles.map((a) => a.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const sortOptions = [
    { value: "date_desc", label: "Sort by Date (Newest)" },
    { value: "date_asc", label: "Sort by Date (Oldest)" },
    { value: "title_asc", label: "Sort by Title (A-Z)" },
    { value: "title_desc", label: "Sort by Title (Z-A)" },
  ];

  const unitOptions = [
    { value: "piece", label: "Piece" },
    { value: "gram", label: "Gram" },
    { value: "kilogram", label: "Kilogram" },
    { value: "metre", label: "Metre" },
    { value: "litre", label: "Litre" },
  ];

  const glossaryOptions = glossaries.map((g) => ({ 
    label: g.name, 
    value: g.id 
  }));

  return (
    <div className="page-wrapper">
      <div className="content">
        <Breadcrumbs
          maintitle="Articles"
          subtitle="Manage Your Articles"
          addButton="Add New Article"
          onAddClick={() => {
            resetForm();
          }}
        />

        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control form-control-sm formsearch"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Link
                    to="#"
                    className="btn btn-searchset"
                    onClick={handleSearch}
                  >
                    <i data-feather="search" className="feather-search" />
                  </Link>
                </div>
              </div>
              <div className="search-path">
                <Link
                  className={`btn btn-filter ${
                    isFilterVisible ? "setclose" : ""
                  }`}
                  id="filter_search"
                  onClick={toggleFilterVisibility}
                >
                  <Filter className="filter-icon" />
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/closes.svg"
                      alt="img"
                    />
                  </span>
                </Link>
              </div>
              <div className="form-sort stylewidth">
                <Sliders className="info-img" />
                <Select
                  className="select"
                  options={sortOptions}
                  placeholder="Sort by Date"
                  value={sortBy}
                  onChange={(option) => {
                    setSortBy(option);
                    fetchArticles();
                  }}
                />
              </div>
            </div>

            {/* Filter */}
            <div
              className={`card${isFilterVisible ? " visible" : ""}`}
              id="filter_inputs"
              style={{ display: isFilterVisible ? "block" : "none" }}
            >
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-3 col-sm-6 col-12 ms-auto">
                    <div className="input-blocks">
                      <Link
                        className="btn btn-filters ms-auto"
                        onClick={handleSearch}
                      >
                        <i data-feather="search" className="feather-search" />{" "}
                        Search
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              {loading ? (
                <div className="text-center p-4">Loading...</div>
              ) : (
                <table className="table datanew">
                  <thead>
                    <tr>
                      <th className="no-sort">
                        <label className="checkboxs">
                          <input
                            type="checkbox"
                            id="select-all"
                            checked={
                              selectedIds.length === articles.length &&
                              articles.length > 0
                            }
                            onChange={handleSelectAll}
                          />
                          <span className="checkmarks" />
                        </label>
                      </th>
                      <th>Title</th>
                      <th>Glossaries</th>
                      <th>Weight</th>
                      <th>Unit</th>
                      <th>Description</th>
                      <th>Created On</th>
                      <th>Last Updated By</th>
                      <th className="no-sort">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No articles found
                        </td>
                      </tr>
                    ) : (
                      articles.map((article) => (
                        <tr key={article.id}>
                          <td>
                            <label className="checkboxs">
                              <input
                                type="checkbox"
                                checked={selectedIds.includes(article.id)}
                                onChange={() => handleSelectOne(article.id)}
                              />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>{article.title}</td>
                          <td>
                            {article.glossary_ids
                              ? JSON.parse(article.glossary_ids).length
                              : 0}{" "}
                            glossaries
                          </td>
                          <td>{article.weight || "N/A"}</td>
                          <td>
                            <span className="badge badge-linesuccess">
                              {article.unit_}
                            </span>
                          </td>
                          <td
                            style={{
                              maxWidth: "200px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <span title={article.description || "N/A"}>
                              {article.description || "N/A"}
                            </span>
                          </td>
                          <td>
                            {new Date(
                              article.created_at
                            ).toLocaleDateString()}
                          </td>
                          <td>{article.last_updated_by || "N/A"}</td>
                          <td className="action-table-data">
                            <div className="edit-delete-action">
                              <Link
                                className="me-2 edit-icon p-2"
                                to="#"
                                onClick={() => handleEdit(article.id)}
                                data-bs-toggle="modal"
                                data-bs-target="#edit-units"
                              >
                                <i data-feather="eye" className="feather-eye" />
                              </Link>
                              <Link
                                className="me-2 p-2"
                                to="#"
                                onClick={() => handleEdit(article.id)}
                                data-bs-toggle="modal"
                                data-bs-target="#edit-units"
                              >
                                <i
                                  data-feather="edit"
                                  className="feather-edit"
                                />
                              </Link>
                              <Link
                                className="confirm-text p-2"
                                to="#"
                                onClick={() => handleDelete(article.id)}
                              >
                                <i
                                  data-feather="trash-2"
                                  className="feather-trash-2"
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Article</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={resetForm}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="modal-title-head">
                      <h6>
                        <span>
                          <i data-feather="info" className="feather-edit" />
                        </span>
                        Article Info
                      </h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">Title *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            maxLength="127"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-blocks">
                          <label>Glossaries</label>
                          <Select
                            className="select"
                            options={glossaryOptions}
                            value={glossaryOptions.filter((g) =>
                              formData.glossary_ids.includes(g.value)
                            )}
                            onChange={(selected) =>
                              setFormData({
                                ...formData,
                                glossary_ids: selected ? selected.map((s) => s.value) : [],
                              })
                            }
                            isMulti
                            isClearable
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Weight</label>
                          <input
                            type="number"
                            className="form-control"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            step="0.01"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Unit *</label>
                          <Select
                            className="select"
                            options={unitOptions}
                            value={unitOptions.find(
                              (u) => u.value === formData.unit_
                            )}
                            onChange={(option) =>
                              setFormData({
                                ...formData,
                                unit_: option?.value || "piece",
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">Dimensions</label>
                          <input
                            type="text"
                            className="form-control"
                            name="dimensions"
                            value={formData.dimensions}
                            onChange={handleInputChange}
                            placeholder="e.g., 10x20x30 cm"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="3"
                            maxLength="255"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                        onClick={resetForm}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-submit">
                        Create Article
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div className="modal fade" id="edit-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Edit Article</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={resetForm}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="modal-title-head">
                      <h6>
                        <span>
                          <i data-feather="info" className="feather-edit" />
                        </span>
                        Article Info
                      </h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">Title *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            maxLength="127"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-blocks">
                          <label>Glossaries</label>
                          <Select
                            className="select"
                            options={glossaryOptions}
                            value={glossaryOptions.filter((g) =>
                              formData.glossary_ids.includes(g.value)
                            )}
                            onChange={(selected) =>
                              setFormData({
                                ...formData,
                                glossary_ids: selected ? selected.map((s) => s.value) : [],
                              })
                            }
                            isMulti
                            isClearable
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Weight</label>
                          <input
                            type="number"
                            className="form-control"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            step="0.01"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Unit *</label>
                          <Select
                            className="select"
                            options={unitOptions}
                            value={unitOptions.find(
                              (u) => u.value === formData.unit_
                            )}
                            onChange={(option) =>
                              setFormData({
                                ...formData,
                                unit_: option?.value || "piece",
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">Dimensions</label>
                          <input
                            type="text"
                            className="form-control"
                            name="dimensions"
                            value={formData.dimensions}
                            onChange={handleInputChange}
                            placeholder="e.g., 10x20x30 cm"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="3"
                            maxLength="255"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                        onClick={resetForm}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-submit">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleProfile;