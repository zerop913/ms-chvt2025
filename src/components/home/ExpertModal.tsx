"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Mail, Globe, Copy, Check } from "lucide-react";
import { Expert } from "../../types/masterclass-new";

interface ExpertModalProps {
  expert: Expert | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpertModal({
  expert,
  isOpen,
  onClose,
}: ExpertModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(type);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const openContact = (contactType: string, value: string) => {
    if (value === "#") return;

    switch (contactType) {
      case "telegram":
        window.open(`https://t.me/${value.replace("@", "")}`, "_blank");
        break;
      case "email":
        window.open(`mailto:${value}`, "_blank");
        break;
      case "website":
        window.open(value, "_blank");
        break;
    }
  };

  if (!isOpen || !expert) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300" />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative w-full max-w-md transform transition-all duration-300 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <div className="bg-gradient-to-br from-chvt-black-900 to-chvt-black-800 rounded-2xl overflow-hidden shadow-2xl border border-chvt-orange-500/30">
          {/* Header */}
          <div className="relative">
            <div className="h-2 bg-chvt-gradient"></div>
            <div className="absolute inset-0 opacity-20">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)",
                }}
              ></div>
            </div>

            <div className="relative p-6 pb-4">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-lg"
              >
                <X size={20} />
              </button>

              <div className="mb-2">
                <div className="inline-flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-chvt-orange-500 rounded-full"></div>
                  <span className="text-chvt-orange-400 text-sm font-mono font-bold uppercase tracking-wider">
                    {expert.role}
                  </span>
                </div>
                <h3 className="font-orbitron text-xl font-bold text-white leading-tight">
                  {expert.name}
                </h3>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div className="px-6 pb-6">
            <h4 className="text-white font-semibold mb-4 font-mono text-sm uppercase tracking-wider">
              Контакты
            </h4>

            <div className="space-y-3">
              {expert.contacts?.telegram &&
                expert.contacts.telegram !== "#" && (
                  <div className="group flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-chvt-orange-500/50 transition-all duration-200">
                    <div
                      className="flex items-center space-x-3 flex-1 cursor-pointer"
                      onClick={() =>
                        openContact("telegram", expert.contacts!.telegram!)
                      }
                    >
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Send size={18} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">
                          Telegram
                        </p>
                        <p className="text-gray-400 text-xs font-mono">
                          {expert.contacts.telegram}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(expert.contacts!.telegram!, "telegram");
                      }}
                      className="p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-lg opacity-0 group-hover:opacity-100"
                    >
                      {copiedField === "telegram" ? (
                        <Check size={16} className="text-green-400" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                )}

              {expert.contacts?.email && expert.contacts.email !== "#" && (
                <div className="group flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-chvt-orange-500/50 transition-all duration-200">
                  <div
                    className="flex items-center space-x-3 flex-1 cursor-pointer"
                    onClick={() =>
                      openContact("email", expert.contacts!.email!)
                    }
                  >
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <Mail size={18} className="text-red-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Email</p>
                      <p className="text-gray-400 text-xs font-mono">
                        {expert.contacts.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(expert.contacts!.email!, "email");
                    }}
                    className="p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-lg opacity-0 group-hover:opacity-100"
                  >
                    {copiedField === "email" ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              )}

              {expert.contacts?.website && expert.contacts.website !== "#" && (
                <div className="group flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-chvt-orange-500/50 transition-all duration-200">
                  <div
                    className="flex items-center space-x-3 flex-1 cursor-pointer"
                    onClick={() =>
                      openContact("website", expert.contacts!.website!)
                    }
                  >
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Globe size={18} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Website</p>
                      <p className="text-gray-400 text-xs font-mono">
                        {expert.contacts.website}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(expert.contacts!.website!, "website");
                    }}
                    className="p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-lg opacity-0 group-hover:opacity-100"
                  >
                    {copiedField === "website" ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Copy Notification */}
            {copiedField && (
              <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Check size={16} className="text-green-400" />
                  <span className="text-green-400 text-sm font-medium">
                    Скопировано в буфер обмена
                  </span>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-6">
              <button
                onClick={onClose}
                className="w-full py-3 bg-chvt-gradient text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-chvt-orange-500/25 transition-all duration-200 transform hover:scale-[1.02] font-mono text-sm uppercase tracking-wider"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
