import "./App.css"
import { useEffect, useState } from "react"
import axios from "axios"

const Grid = ({ images, isLoading, handleClick }) => {
  if (isLoading) {
    return <div className="loader"></div>
  } else
    return (
      !isLoading && (
        <div className="photo-grid">
          {images.map((image) => {
            if (image.s || image.dhd) {
              return (
                <img
                  key={image.id}
                  src={image.dsd || image.wfs || image.s || image.dhd}
                  alt={`image ${image.id}`}
                  onClick={() => handleClick(image)}
                />
              )
            }
            return null
          })}
        </div>
      )
    )
}
function App() {
  const [images, setImages] = useState({})
  const [loading, setLoading] = useState(true)
  const [modalImage, setModalImage] = useState(null)

  const handleClick = (img) => {
    setModalImage(img)
  }
  const handleCloseModal = () => {
    setModalImage(null)
  }

  useEffect(() => {
    axios
      .get("/media-1a-i-p~s.json")
      .then((response) => {
        setImages(response.data.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
    setLoading(!loading)
  }, [])
  const imagesArray = Object.entries(images).map(([key, value]) => ({
    id: key,
    dsd: value.dsd,
    dhd: value.dhd,
    s: value.s,
    wfs: value.wfs,
  }))

  return (
    <div className="App" style={{ overflowY: modalImage ? "hidden" : "auto" }}>
      <header>
        <h1>Wallpapers</h1>
        <p>Click to view fullsize image</p>
      </header>
      <Grid
        isLoading={loading}
        images={imagesArray}
        handleClick={handleClick}
      />
      {modalImage && (
        <div className="modal" onClick={handleCloseModal}>
          <img
            src={modalImage.s || modalImage.dhd || image.wfs || image.dsd}
            alt=""
            className="modal-image"
          />
          <p className="pc-guide" style={{ color: "white", marginTop: "4px" }}>
            Right click to download image
          </p>
          <p
            className="phone-guide"
            style={{ color: "white", marginTop: "4px" }}
          >
            Hold to download image
          </p>
        </div>
      )}
    </div>
  )
}

export default App
