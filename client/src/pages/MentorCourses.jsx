import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Link as LinkIcon, 
  BookOpen, 
  CheckCircle, 
  Menu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MentorSide from "../components/MentorSide";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const MentorCourses = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [features, setFeatures] = useState([
    "Responsive Design Techniques", 
    "HTML5 & CSS3 Fundamentals"
  ]);
  const [resources, setResources] = useState([
    { name: "MDN Web Docs", link: "https://developer.mozilla.org/" },
    { name: "W3Schools", link: "https://w3schools.com/" }
  ]);

  const [newFeature, setNewFeature] = useState("");
  const [newResourceName, setNewResourceName] = useState("");
  const [newResourceLink, setNewResourceLink] = useState("");
  const [editingFeature, setEditingFeature] = useState(null);
  const [editingResource, setEditingResource] = useState(null);

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      if (editingFeature !== null) {
        const updatedFeatures = [...features];
        updatedFeatures[editingFeature] = newFeature.trim();
        setFeatures(updatedFeatures);
        setEditingFeature(null);
      } else {
        setFeatures([...features, newFeature.trim()]);
      }
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleAddResource = () => {
    if (newResourceName.trim() && newResourceLink.trim()) {
      if (editingResource !== null) {
        const updatedResources = [...resources];
        updatedResources[editingResource] = {
          name: newResourceName.trim(),
          link: newResourceLink.trim()
        };
        setResources(updatedResources);
        setEditingResource(null);
      } else {
        setResources([
          ...resources,
          { name: newResourceName.trim(), link: newResourceLink.trim() }
        ]);
      }
      setNewResourceName("");
      setNewResourceLink("");
    }
  };

  const handleRemoveResource = (index) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const handleEditFeature = (index) => {
    setNewFeature(features[index]);
    setEditingFeature(index);
  };

  const handleEditResource = (index) => {
    setNewResourceName(resources[index].name);
    setNewResourceLink(resources[index].link);
    setEditingResource(index);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed z-40 lg:static transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <MentorSide />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="bg-white shadow-md p-4 lg:hidden flex">
          {/* <Button 
            variant="ghost"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button> */}
          <h1 className="text-2xl items-left ml-20 justify-center font-bold">Course Management</h1>
        </header>

        {/* Course Content */}
        <div className="p-6 space-y-2">
          <Card className="w-full max-w-4xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-3 text-blue-600" />
                Web Design & Development
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Features Section */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <CheckCircle className="mr-2 text-green-500" /> 
                  Course Features
                </h2>
                <AnimatePresence>
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center mb-2 p-3 bg-white rounded-lg shadow-sm"
                    >
                      <Badge variant="secondary" className="mr-3">{index + 1}</Badge>
                      <span className="flex-1">{feature}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                        onClick={() => handleEditFeature(index)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleRemoveFeature(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <div className="flex space-x-2 mt-4">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder={editingFeature !== null ? "Edit feature" : "Add new feature"}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleAddFeature}
                    variant={editingFeature !== null ? "default" : "success"}
                  >
                    <Plus className="mr-2" /> 
                    {editingFeature !== null ? "Update" : "Add"}
                  </Button>
                </div>
              </div>

              {/* Resources Section */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <LinkIcon className="mr-2 text-blue-500" /> 
                  Course Resources
                </h2>
                <AnimatePresence>
                  {resources.map((resource, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center mb-2 p-3 bg-white rounded-lg shadow-sm"
                    >
                      <Badge variant="outline" className="mr-3">{index + 1}</Badge>
                      <div className="flex-1">
                        <div>{resource.name}</div>
                        <a 
                          href={resource.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {resource.link}
                        </a>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                        onClick={() => handleEditResource(index)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleRemoveResource(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                  <Input
                    value={newResourceName}
                    onChange={(e) => setNewResourceName(e.target.value)}
                    placeholder={editingResource !== null ? "Edit resource name" : "Resource name"}
                  />
                  <Input
                    value={newResourceLink}
                    onChange={(e) => setNewResourceLink(e.target.value)}
                    placeholder={editingResource !== null ? "Edit resource link" : "Resource link"}
                  />
                  <Button 
                    onClick={handleAddResource}
                    variant={editingResource !== null ? "default" : "success"}
                    className="col-span-1 md:col-span-2"
                  >
                    <Plus className="mr-2" /> 
                    {editingResource !== null ? "Update Resource" : "Add Resource"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentorCourses;