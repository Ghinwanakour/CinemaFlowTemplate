import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from '../image/imgi_1_default.jpeg'
import { gsap } from 'gsap'

function Header() {
  const [MenuOpen, setMenuOpen] = useState(false)
  const [Scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const desktopLinksRef = useRef(null)
  const activeAnimationsRef = useRef(new Map())
  const spotRef = useRef(null)
  const closeButtonRef = useRef(null)
  const menuLinksRef = useRef([])
  const menuLinesRef = useRef({ top: null, middle: null, bottom: null })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // تأثير البقعة الضوئية عند فتح/غلق المنيو
  useEffect(() => {
    if (MenuOpen) {
      setTimeout(() => {
        const menu = document.querySelector('.menu-overlay')
        if (!menu) return
        
        const closeBtn = document.querySelector('.hamburger-button')
        closeButtonRef.current = closeBtn
        
        const menuLinks = menu.querySelectorAll('a')
        menuLinksRef.current = menuLinks
        
        const spot = document.createElement('div')
        spot.className = 'full-page-menu-bg-highlight'
        
        spot.style.cssText = `
          position: absolute;
          width: 40vw;
          height: 40vw;
          max-width: 400px;
          max-height: 400px;
          filter: blur(60px);
          background-image: radial-gradient(circle closest-side, #ffffff40, #fff0);
          border-radius: 100%;
          pointer-events: none;
          z-index: 0;
          will-change: transform;
          transform-style: preserve-3d;
          opacity: 0.7;
        `
        
        gsap.set(spot, {
          x: '-50%',
          y: '-50%',
          left: '50%',
          top: '50%'
        })
        
        menu.appendChild(spot)
        spotRef.current = spot
        
        const handleMouseMove = (e) => {
          if (!spotRef.current) return
          
          if (closeButtonRef.current) {
            const closeBtnRect = closeButtonRef.current.getBoundingClientRect()
            const mouseX = e.clientX
            const mouseY = e.clientY
            
            if (mouseX >= closeBtnRect.left && 
                mouseX <= closeBtnRect.right && 
                mouseY >= closeBtnRect.top && 
                mouseY <= closeBtnRect.bottom) {
              
              gsap.to(spotRef.current, {
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
                duration: 0.5,
                ease: "power2.out",
                overwrite: true
              })
              return
            }
          }
          
          const rect = menu.getBoundingClientRect()
          const mouseX = e.clientX - rect.left
          const mouseY = e.clientY - rect.top
          
          gsap.to(spotRef.current, {
            left: mouseX,
            top: mouseY,
            x: '-50%',
            y: '-50%',
            duration: 0.15,
            ease: "power1.out",
            overwrite: true
          })
        }
        
        window.addEventListener('mousemove', handleMouseMove)
        
        return () => {
          window.removeEventListener('mousemove', handleMouseMove)
          if (spotRef.current) {
            gsap.to(spotRef.current, {
              opacity: 0,
              scale: 0.5,
              duration: 0.5,
              onComplete: () => {
                if (spotRef.current) {
                  spotRef.current.remove()
                  spotRef.current = null
                }
              }
            })
          }
        }
      }, 100)
      
    } else {
      if (spotRef.current) {
        spotRef.current.remove()
        spotRef.current = null
      }
      closeButtonRef.current = null
      menuLinksRef.current = []
      setHoveredLink(null)
    }
  }, [MenuOpen])

  // تأثير حركة خطوط المنيو
  useEffect(() => {
  const topLine = document.querySelector('.hamburger-line.top')
  const middleLine = document.querySelector('.hamburger-line.middle')
  const bottomLine = document.querySelector('.hamburger-line.bottom')
  
  if (topLine && middleLine && bottomLine) {
    menuLinesRef.current = { top: topLine, middle: middleLine, bottom: bottomLine }
    
    if (MenuOpen) {

      gsap.to(topLine, {
        y: 8,
        rotation: 45,
        duration: 0.3,
        ease: "power2.inOut",
        transformOrigin: "center center"
      })

      // التصحيح هنا
      gsap.fromTo(middleLine,
        { x: '260%', opacity: 0 },
        { x: '-260%', opacity: 0, duration: 0.3, ease: "power2.inOut" }
      )

      gsap.to(bottomLine, {
        y: -4,
        rotation: 135,
        duration: 0.3,
        ease: "power2.inOut",
        transformOrigin: "center center"
      })

    } else {

      gsap.to(topLine, {
        y: 0,
        rotation: 0,
        duration: 0.3
      })

      gsap.to(middleLine, {
        x: '0%',
        opacity: 1,
        duration: 0.3
      })

      gsap.to(bottomLine, {
        y: 0,
        rotation: 0,
        duration: 0.3
      })

    }
  }
}, [MenuOpen])

  // تأثير GSAP على روابط الشاشات الكبيرة
  useEffect(() => {
    if (!MenuOpen && desktopLinksRef.current) {
      const desktopLinks = desktopLinksRef.current.querySelectorAll('a')
      
      desktopLinks.forEach((link) => {
        // حفظ النص الأصلي
        const originalText = link.textContent || ''
        link.setAttribute('data-original-text', originalText)
        
        // عند دخول الماوس
        const handleMouseEnter = () => {
          // إيقاف أي حركة سابقة على هذا الرابط
          if (activeAnimationsRef.current.has(link)) {
            activeAnimationsRef.current.get(link).kill()
            activeAnimationsRef.current.delete(link)
          }

          // التأكد من أن الرابط لا يزال يحتوي على النص الأصلي
          if (link.innerHTML !== originalText) {
            link.innerHTML = originalText
          }

          // تقسيم النص إلى أحرف
          const letters = originalText.split('').map((char) => {
            if (char === ' ') return '<span class="split-letter" style="display: inline-block;">&nbsp;</span>'
            return `<span class="split-letter" style="display: inline-block; color: inherit;">${char}</span>`
          }).join('')
          
          // حفظ النص الأصلي مؤقتاً
          const tempText = link.innerHTML
          
          // تطبيق HTML الجديد
          link.innerHTML = letters
          
          const letterElements = link.querySelectorAll('.split-letter')
          
          // تحريك الأحرف
          const animation = gsap.fromTo(letterElements,
            { 
              y: 0, 
              color: 'inherit',
              opacity: 1
            },
            {
              y: -2,
              color: '#9CA3AF',
              duration: 0.3,
              stagger: {
                amount: 0.2,
                from: "start"
              },
              ease: "power1.inOut",
              onComplete: () => {
                // لا نفعل شيئاً هنا، نترك الأحرف كما هي
              }
            }
          )
          
          activeAnimationsRef.current.set(link, animation)
        }
        
        // عند خروج الماوس
        const handleMouseLeave = () => {
          const letterElements = link.querySelectorAll('.split-letter')
          
          if (letterElements.length > 0) {
            // إيقاف أي حركة نشطة
            if (activeAnimationsRef.current.has(link)) {
              activeAnimationsRef.current.get(link).kill()
              activeAnimationsRef.current.delete(link)
            }
            
            // إعادة الأحرف إلى حالتها الطبيعية
            gsap.to(letterElements, {
              y: 0,
              color: 'inherit',
              duration: 0.4,
              stagger: {
                amount: 0.2,
                from: "end"
              },
              ease: "power2.out",
              onComplete: () => {
                // إعادة النص الأصلي بعد انتهاء الحركة
                if (link.querySelectorAll('.split-letter').length > 0) {
                  link.innerHTML = originalText
                }
              }
            })
          }
        }
        
        // إزالة المستمعين القديمين إذا وجدوا
        link.removeEventListener('mouseenter', handleMouseEnter)
        link.removeEventListener('mouseleave', handleMouseLeave)
        
        // إضافة المستمعين الجدد
        link.addEventListener('mouseenter', handleMouseEnter)
        link.addEventListener('mouseleave', handleMouseLeave)
        
        // تنظيف المستمعين عند إزالة المكون
        return () => {
          link.removeEventListener('mouseenter', handleMouseEnter)
          link.removeEventListener('mouseleave', handleMouseLeave)
          
          if (activeAnimationsRef.current.has(link)) {
            activeAnimationsRef.current.get(link).kill()
            activeAnimationsRef.current.delete(link)
          }
        }
      })
    }
  }, [MenuOpen])

  const handleMenuLinkMouseEnter = (index) => {
    setHoveredLink(index)
    
    menuLinksRef.current.forEach((link, i) => {
      if (i === index) {
        gsap.to(link, {
          scale: 1.1,
          color: '#ffffff',
          duration: 0.3,
          ease: "power2.out"
        })
      } else {
        gsap.to(link, {
          filter: 'blur(4px)',
          opacity: 0.5,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    })
  }

  const handleMenuLinkMouseLeave = () => {
    setHoveredLink(null)
    
    menuLinksRef.current.forEach((link) => {
      gsap.to(link, {
        scale: 1,
        color: '#ffffff',
        filter: 'blur(0px)',
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    })
  }

  const handleMenuToggle = () => {
    setMenuOpen(!MenuOpen)
  }

  // أيقونة - بهيكل HTML بسيط
  const HamburgerIcon = () => (
    <div style={{ position: 'relative', width: '24px', height: '24px' }}>
      <div className="hamburger-line top" style={{
        position: 'absolute',
        width: '24px',
        height: '2px',
        backgroundColor: 'white',
        top: '6px',
        left: 0,
        transformOrigin: 'center',
        transition: 'all 0.3s ease'
      }}></div>
      <div className="hamburger-line middle" style={{
        position: 'absolute',
        width: '24px',
        height: '2px',
        backgroundColor: 'white',
        top: '12px',
        left: 0,
        transformOrigin: 'center',
        transition: 'all 0.3s ease'
      }}></div>
      <div className="hamburger-line bottom" style={{
        position: 'absolute',
        width: '24px',
        height: '2px',
        backgroundColor: 'white',
        top: '18px',
        left: 0,
        transformOrigin: 'center',
        transition: 'all 0.3s ease'
      }}></div>
    </div>
  )

  return (
    <>
      <header className={`w-full z-50 py-10 px-4 md:px-10 lg:px-35 transition-all duration-300 ${
        Scrolled ? 'bg-transparent' : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between">
          {/* الشعار على اليسار */}
          <Link to="/">
            <img src={logo} alt="logo" className="h-12 px-4 md:h-16" />  
          </Link>

          {/* المجموعة اليمنى: الروابط + زر المنيو معاً */}
          <div className="flex items-center">
            {/* روابط التنقل للشاشات الكبيرة - الآن بجانب زر المنيو */}
            {!MenuOpen && (
              <div 
                ref={desktopLinksRef}
                className="hidden md:flex bg-white/10 p-4.5 rounded-full items-center space-x-1 backdrop-blur-sm"
              >
                <Link to="/home" className="text-white hover:text-gray-300 px-2 py-1 text-sm lg:text-base">Home</Link>
                <Link to="/about" className="text-white hover:text-gray-300 px-2 py-1 text-sm lg:text-base">About</Link>
                <Link to="/portfolio" className="text-white hover:text-gray-300 px-2 py-1 text-sm lg:text-base">Portfolio</Link>
                <Link to="/blog" className="text-white hover:text-gray-300 px-2 py-1 text-sm lg:text-base">Blog</Link>
              </div>
            )}

            {/* زر - يظهر دائماً بغض النظر عن حالة المنيو */}
            <button 
              ref={closeButtonRef}
              className="hamburger-button flex rounded-full justify-center items-center w-11 h-11 md:w-18 md:h-18 relative overflow-hidden z-50 bg-white/10"
              onClick={handleMenuToggle}
              style={{
                backdropFilter: 'blur(6px)',
              }}
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </header>

      {/*قائمة المنيو المنزلقة*/}
      {MenuOpen && (
        <div className="menu-overlay fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-black/90 backdrop-blur-xl overflow-hidden">
          {/* الروابط */}
          <Link 
            to="/home" 
            className="text-4xl md:text-5xl text-white transition-all duration-300 relative z-10"
            onClick={() => setMenuOpen(false)}
            onMouseEnter={() => handleMenuLinkMouseEnter(0)}
            onMouseLeave={handleMenuLinkMouseLeave}
            style={{ 
              filter: hoveredLink !== null && hoveredLink !== 0 ? 'blur(4px)' : 'none',
              opacity: hoveredLink !== null && hoveredLink !== 0 ? 0.5 : 1,
              transform: hoveredLink === 0 ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-4xl md:text-5xl text-white transition-all duration-300 relative z-10"
            onClick={() => setMenuOpen(false)}
            onMouseEnter={() => handleMenuLinkMouseEnter(1)}
            onMouseLeave={handleMenuLinkMouseLeave}
            style={{ 
              filter: hoveredLink !== null && hoveredLink !== 1 ? 'blur(4px)' : 'none',
              opacity: hoveredLink !== null && hoveredLink !== 1 ? 0.5 : 1,
              transform: hoveredLink === 1 ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            About
          </Link>
          <Link 
            to="/portfolio" 
            className="text-4xl md:text-5xl text-white transition-all duration-300 relative z-10"
            onClick={() => setMenuOpen(false)}
            onMouseEnter={() => handleMenuLinkMouseEnter(2)}
            onMouseLeave={handleMenuLinkMouseLeave}
            style={{ 
              filter: hoveredLink !== null && hoveredLink !== 2 ? 'blur(4px)' : 'none',
              opacity: hoveredLink !== null && hoveredLink !== 2 ? 0.5 : 1,
              transform: hoveredLink === 2 ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            Portfolio
          </Link>
          <Link 
            to="/blog" 
            className="text-4xl md:text-5xl text-white transition-all duration-300 relative z-10"
            onClick={() => setMenuOpen(false)}
            onMouseEnter={() => handleMenuLinkMouseEnter(3)}
            onMouseLeave={handleMenuLinkMouseLeave}
            style={{ 
              filter: hoveredLink !== null && hoveredLink !== 3 ? 'blur(4px)' : 'none',
              opacity: hoveredLink !== null && hoveredLink !== 3 ? 0.5 : 1,
              transform: hoveredLink === 3 ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            Blog
          </Link>
        </div>
      )}
    </>
  )
}

export default Header