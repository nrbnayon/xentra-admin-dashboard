import { Match } from "@/types/matches";
import { X, UploadCloud } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Image from "next/image";
import TranslatedText from "@/components/Shared/TranslatedText";

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => void;
  match?: Match | null;
}

export default function MatchModal({
  isOpen,
  onClose,
  onSave,
  match,
}: MatchModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    sport: "Football",
    league: "",
    date: "",
    time: "",
    teamA: "",
    teamB: "",
    entryFee: 50,
    platformFee: "",
    isFeatured: false,
    winUpTo: "",
    image: null as File | null,
    imagePreview: "" as string,
    teamAFlag: null as File | null,
    teamAFlagPreview: "" as string,
    teamBFlag: null as File | null,
    teamBFlagPreview: "" as string,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const teamAFlagRef = useRef<HTMLInputElement>(null);
  const teamBFlagRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (match) {
      // Match dates from the backend are implicitly treated as UTC
      // Convert UTC to local browser time for the form inputs
      const utcDate = new Date(`${match.match_time_start}Z`);
      let datePart = "";
      let timePart = "";
      
      if (!isNaN(utcDate.getTime())) {
        datePart = utcDate.toLocaleDateString('en-CA'); // YYYY-MM-DD local
        timePart = utcDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // HH:MM local
      }

      setFormData({
        title: match.match_title || "",
        sport: match.sport_name || "Football",
        league: match.league_name || "",
        date: datePart,
        time: timePart,
        teamA: match.team_a || "",
        teamB: match.team_b || "",
        entryFee: Number(match.entry_fee) || 50,
        platformFee: match.platform_fee_percent?.toString() || "",
        isFeatured: match.feature_match === 1,
        winUpTo: match.promotional_amount?.toString() || "",
        image: null,
        imagePreview: match.image_url || "",
        teamAFlag: null,
        teamAFlagPreview: match.team_a_logo || "",
        teamBFlag: null,
        teamBFlagPreview: match.team_b_logo || "",
      });
    } else {
      setFormData({
        title: "",
        sport: "Football",
        league: "",
        date: "",
        time: "",
        teamA: "",
        teamB: "",
        entryFee: 50,
        platformFee: "",
        isFeatured: false,
        winUpTo: "",
        image: null,
        imagePreview: "",
        teamAFlag: null,
        teamAFlagPreview: "",
        teamBFlag: null,
        teamBFlagPreview: "",
      });
    }
    setErrors({});
  }, [match, isOpen]);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFile = (
    file: File,
    type: "image" | "teamAFlag" | "teamBFlag",
  ) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === "image") {
          setFormData((prev) => ({
            ...prev,
            image: file,
            imagePreview: e.target?.result as string,
          }));
        } else if (type === "teamAFlag") {
          setFormData((prev) => ({
            ...prev,
            teamAFlag: file,
            teamAFlagPreview: e.target?.result as string,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            teamBFlag: file,
            teamBFlagPreview: e.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload an image file.");
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    type: "image" | "teamAFlag" | "teamBFlag",
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], type);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "teamAFlag" | "teamBFlag",
  ) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], type);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = "Match Title is required";
    if (!formData.league) newErrors.league = "League Name is required";
    if (!formData.date) newErrors.date = "Match Date is required";
    if (!formData.time) newErrors.time = "Match Time Start is required";
    if (!formData.teamA) newErrors.teamA = "Team A is required";
    if (!formData.teamB) newErrors.teamB = "Team B is required";
    if (!formData.platformFee)
      newErrors.platformFee = "Platform fee is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const submitData = new FormData();
    submitData.append("match_title", formData.title);
    submitData.append("sport_name", formData.sport);
    submitData.append("league_name", formData.league);

    // Map the selected local time to a true UTC naive string for the backend
    const timeValue = formData.time.length === 5 ? `${formData.time}:00` : formData.time;
    if (formData.date && timeValue) {
      // Create local date object
      const localDate = new Date(`${formData.date}T${timeValue}`);
      // Get the UTC components directly using built-in Date methods
      const isoUTC = localDate.toISOString().split(".")[0]; 
      // Result is like 2026-04-01T08:30:00, which the backend will treat correctly as naive UTC
      submitData.append("match_date", isoUTC.split("T")[0] + "T00:00:00");
      submitData.append("match_time_start", isoUTC);
    }

    submitData.append("team_a", formData.teamA);
    submitData.append("team_b", formData.teamB);
    submitData.append("platform_fee_percent", formData.platformFee);
    if (formData.winUpTo) {
      submitData.append("promotional_amount", formData.winUpTo);
    } else {
      submitData.append("promotional_amount", "0.00");
    }
    submitData.append("feature_match", formData.isFeatured ? "1" : "0");
    submitData.append("entry_fee", formData.entryFee.toString());

    if (formData.image instanceof File)
      submitData.append("image_url", formData.image);
    if (formData.teamAFlag instanceof File)
      submitData.append("team_a_logo", formData.teamAFlag);
    if (formData.teamBFlag instanceof File)
      submitData.append("team_b_logo", formData.teamBFlag);

    onSave(submitData);
    // Don't close immediately here, since API call will be handled in parent, let parent close it after success.
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-foreground dark:text-white">
            <TranslatedText text={match ? "Edit Match" : "Create Match"} />
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Banner Image - Now at Top */}
          <div>
            <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1 flex justify-between">
              <span>
                <TranslatedText text="Banner Image" />
              </span>
              {formData.imagePreview && (
                <button
                  className="text-red-500 hover:text-red-700 flex items-center gap-1 text-xs cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData({ ...formData, image: null, imagePreview: "" });
                  }}
                >
                  <X className="w-4 h-4" /> <TranslatedText text="Remove" />
                </button>
              )}
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={(e) => handleDrop(e, "image")}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all min-h-[160px] relative overflow-hidden ${
                dragActive
                  ? "border-primary bg-primary/10"
                  : "border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/10"
              } hover:bg-blue-100 dark:hover:bg-blue-900/20`}
            >
              {formData.imagePreview ? (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={formData.imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-medium">
                      <TranslatedText text="Click to change" />
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 text-gray-500 dark:text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-foreground dark:text-gray-300">
                    <TranslatedText text="Click to upload or drag and drop" />
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    <TranslatedText text="Max. File Size" />: 10MB
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    <TranslatedText text="(Optional) Min dimensions: 450x350px" />
                  </p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "image")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                <TranslatedText text="Match Title" />{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g. FIFA WORLD CUP"
                className={`w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? "border-red-500" : ""}`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  <TranslatedText text={errors.title} />
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                <TranslatedText text="Sport Name" />{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.sport}
                onChange={(e) =>
                  setFormData({ ...formData, sport: e.target.value })
                }
                className="w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Football">Football</option>
                <option value="Basketball">Basketball</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
              <TranslatedText text="League Name" />{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.league}
              onChange={(e) =>
                setFormData({ ...formData, league: e.target.value })
              }
              placeholder="e.g. Premier League"
              className={`w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors.league ? "border-red-500" : ""}`}
            />
            {errors.league && (
              <p className="text-red-500 text-xs mt-1">
                <TranslatedText text={errors.league} />
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                <TranslatedText text="Match Date" />{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className={`w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors.date ? "border-red-500" : ""}`}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">
                  <TranslatedText text={errors.date} />
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                <TranslatedText text="Match Time Start" />{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className={`w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors.time ? "border-red-500" : ""}`}
              />
              {errors.time && (
                <p className="text-red-500 text-xs mt-1">
                  <TranslatedText text={errors.time} />
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Team A Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                  <TranslatedText text="Team A" />{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.teamA}
                  onChange={(e) =>
                    setFormData({ ...formData, teamA: e.target.value })
                  }
                  placeholder="Team A Name"
                  className={`w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors.teamA ? "border-red-500" : ""}`}
                />
                {errors.teamA && (
                  <p className="text-red-500 text-xs mt-1">
                    <TranslatedText text={errors.teamA} />
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1 flex justify-between">
                  <span>
                    <TranslatedText text="Team A Flag" />
                  </span>
                  {formData.teamAFlagPreview && (
                    <button
                      className="text-red-500 hover:text-red-700 flex items-center gap-1 text-xs cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setFormData({
                          ...formData,
                          teamAFlag: null,
                          teamAFlagPreview: "",
                        });
                      }}
                    >
                      <X className="w-4 h-4" /> <TranslatedText text="Remove" />
                    </button>
                  )}
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => handleDrop(e, "teamAFlag")}
                  onClick={() => teamAFlagRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all min-h-[120px] relative overflow-hidden ${
                    dragActive
                      ? "border-primary bg-primary/10"
                      : "border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/10"
                  } hover:bg-blue-100 dark:hover:bg-blue-900/20`}
                >
                  {formData.teamAFlagPreview ? (
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={formData.teamAFlagPreview}
                        alt="Team A Flag"
                        fill
                        className="object-contain p-2"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs font-medium">
                          <TranslatedText text="Change" />
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-6 h-6 text-gray-500 mb-1" />
                      <p className="text-xs font-medium text-foreground dark:text-gray-300">
                        <TranslatedText text="Upload Team A Flag" />
                      </p>
                    </>
                  )}
                </div>
                <input
                  ref={teamAFlagRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "teamAFlag")}
                />
              </div>
            </div>

            {/* Team B Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                  <TranslatedText text="Team B" />{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.teamB}
                  onChange={(e) =>
                    setFormData({ ...formData, teamB: e.target.value })
                  }
                  placeholder="Team B Name"
                  className={`w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 ${errors.teamB ? "border-red-500" : ""}`}
                />
                {errors.teamB && (
                  <p className="text-red-500 text-xs mt-1">
                    <TranslatedText text={errors.teamB} />
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1 flex justify-between">
                  <span>
                    <TranslatedText text="Team B Flag" />
                  </span>
                  {formData.teamBFlagPreview && (
                    <button
                      className="text-red-500 hover:text-red-700 flex items-center gap-1 text-xs cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setFormData({
                          ...formData,
                          teamBFlag: null,
                          teamBFlagPreview: "",
                        });
                      }}
                    >
                      <X className="w-4 h-4" /> <TranslatedText text="Remove" />
                    </button>
                  )}
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => handleDrop(e, "teamBFlag")}
                  onClick={() => teamBFlagRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all min-h-[120px] relative overflow-hidden ${
                    dragActive
                      ? "border-primary bg-primary/10"
                      : "border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/10"
                  } hover:bg-blue-100 dark:hover:bg-blue-900/20`}
                >
                  {formData.teamBFlagPreview ? (
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={formData.teamBFlagPreview}
                        alt="Team B Flag"
                        fill
                        className="object-contain p-2"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs font-medium">
                          <TranslatedText text="Change" />
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-6 h-6 text-gray-500 mb-1" />
                      <p className="text-xs font-medium text-foreground dark:text-gray-300">
                        <TranslatedText text="Upload Team B Flag" />
                      </p>
                    </>
                  )}
                </div>
                <input
                  ref={teamBFlagRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "teamBFlag")}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Platform Fee */}
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-3">
                  <TranslatedText text="Platform fee" />{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-4 lg:gap-8 items-center">
                  {[25, 50, 75, 100].map((fee) => (
                    <label
                      key={fee}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={Number(formData.platformFee) === fee}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              platformFee: fee.toString(),
                            })
                          }
                          className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 appearance-none checked:bg-gray-500 checked:border-gray-500 transition-all cursor-pointer"
                        />
                        {Number(formData.platformFee) === fee && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg
                              className="w-3.5 h-3.5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-foreground transition-colors">
                        {fee}%
                      </span>
                    </label>
                  ))}
                </div>
                {errors.platformFee && (
                  <p className="text-red-500 text-xs mt-1">
                    <TranslatedText text={errors.platformFee} />
                  </p>
                )}
              </div>

              {/* Entry Fee */}
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-3">
                  <TranslatedText text="Entry Fee" />{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-4 items-center">
                  {[50, 100, 250, 500].map((fee) => (
                    <label
                      key={fee}
                      className="flex items-center gap-1.5 cursor-pointer group"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.entryFee === fee}
                          onChange={() =>
                            setFormData({ ...formData, entryFee: fee })
                          }
                          className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 appearance-none checked:bg-gray-500 checked:border-gray-500 transition-all cursor-pointer"
                        />
                        {formData.entryFee === fee && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg
                              className="w-3.5 h-3.5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-foreground transition-colors">
                        {fee} HTG
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              {/* Promotional Amount */}
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-1">
                  <TranslatedText text="Promotional Amount (Win Up To)" />
                </label>
                <input
                  type="number"
                  value={formData.winUpTo}
                  onChange={(e) =>
                    setFormData({ ...formData, winUpTo: e.target.value })
                  }
                  className="w-full border rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 500,000 HTG"
                />
              </div>

              {/* Featured Match */}
              <div className="flex items-center gap-2 py-2.5">
                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      isFeatured: !formData.isFeatured,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    formData.isFeatured
                      ? "bg-primary"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.isFeatured ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <TranslatedText text="Featured Match" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t dark:border-gray-700 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-8 w-40 py-2.5 border rounded-full text-foreground dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <TranslatedText text="Cancel" />
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 w-40 py-2.5 bg-primary hover:bg-[#2a4365] text-white rounded-full font-medium shadow transition-colors cursor-pointer"
          >
            <TranslatedText text={match ? "Save" : "+ Create"} />
          </button>
        </div>
      </div>
    </div>
  );
}
